import { useState, useRef, useEffect } from "react"
import { FaRobot, FaTimes, FaPaperPlane, FaSpinner, FaTrash } from "react-icons/fa"
import { sendMessageToAI, getChatHistory, clearChatHistory } from "../../services/operations/aiAPI"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingHistory, setIsLoadingHistory] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const { token } = useSelector((state) => state.auth)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Load chat history when component mounts or when chat opens
  useEffect(() => {
    const loadHistory = async () => {
      if (token && isOpen) {
        setIsLoadingHistory(true)
        try {
          const history = await getChatHistory(token)
          if (history && history.length > 0) {
            // If we have history, replace the default welcome message
            setMessages(history.map(msg => ({
              text: msg.text,
              sender: msg.sender,
              timestamp: new Date(msg.timestamp),
            })))
          } else {
            // If no history, keep the welcome message
            setMessages([
              {
                text: "Hello! I'm your AI assistant. How can I help you today?",
                sender: "bot",
                timestamp: new Date(),
              },
            ])
          }
        } catch (error) {
          console.error("Error loading chat history:", error)
        } finally {
          setIsLoadingHistory(false)
        }
      }
    }

    loadHistory()
  }, [token, isOpen])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    if (!token) {
      alert("Please login to use the AI assistant")
     
      return
    }

    const userMessage = {
      text: inputMessage.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const question = inputMessage.trim()
    setInputMessage("")
    setIsLoading(true)

    try {
      const response = await sendMessageToAI(token, question)
      
      const botMessage = {
        text: response,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      const errorMessage = {
        text: "Sorry, I encountered an error. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
        isError: true,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearHistory = async () => {
    if (!token) return
    
    if (window.confirm("Are you sure you want to clear all chat history?")) {
      const success = await clearChatHistory(token)
      if (success) {
        setMessages([
          {
            text: "Hello! I'm your AI assistant. How can I help you today?",
            sender: "bot",
            timestamp: new Date(),
          },
        ])
      }
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-blue-500 to-caribbeangreen-500 hover:from-blue-600 hover:to-caribbeangreen-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 animate-bounce hover:animate-none group"
          aria-label="Open AI Assistant"
        >
          <FaRobot className="text-2xl group-hover:rotate-12 transition-transform duration-300" />
          <span className="absolute -top-2 -right-2 bg-yellow-50 text-richblack-900 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
            B
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-8 right-8 z-50 w-[90vw] max-w-md h-[600px] bg-richblack-900 rounded-2xl shadow-2xl flex flex-col border border-richblack-700 overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-caribbeangreen-600 p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <FaRobot className="text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-lg">AI Assistant</h3>
                <p className="text-xs text-white/80">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {token && messages.length > 1 && (
                <button
                  onClick={handleClearHistory}
                  className="hover:bg-white/20 p-2 rounded-full transition-colors duration-200"
                  aria-label="Clear chat history"
                  title="Clear chat history"
                >
                  <FaTrash className="text-sm" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-2 rounded-full transition-colors duration-200"
                aria-label="Close chat"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-richblack-900 to-richblack-800">
            {isLoadingHistory ? (
              <div className="flex justify-center items-center h-full">
                <div className="flex items-center gap-2 text-richblack-400">
                  <FaSpinner className="animate-spin" />
                  <span>Loading chat history...</span>
                </div>
              </div>
            ) : (
              <>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    } animate-fade-in`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-3 ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-br-none"
                          : message.isError
                          ? "bg-red-900/50 text-red-200 border border-red-700"
                          : "bg-richblack-800 text-richblack-5 border border-richblack-700 rounded-bl-none"
                      } shadow-lg`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                        {message.text}
                      </p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === "user"
                            ? "text-blue-100"
                            : "text-richblack-400"
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="bg-richblack-800 text-richblack-5 border border-richblack-700 rounded-2xl rounded-bl-none p-3 shadow-lg">
                      <div className="flex items-center gap-2">
                        <FaSpinner className="animate-spin text-blue-400" />
                        <span className="text-sm text-richblack-300">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-richblack-800 border-t border-richblack-700">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading || isLoadingHistory}
                className="flex-1 bg-richblack-900 text-richblack-5 border border-richblack-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-richblack-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim() || isLoadingHistory}
                className="bg-gradient-to-r from-blue-600 to-caribbeangreen-600 hover:from-blue-700 hover:to-caribbeangreen-700 text-white p-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shadow-lg"
                aria-label="Send message"
              >
                {isLoading ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <FaPaperPlane />
                )}
              </button>
            </div>
            {!token && (
              <p className="text-xs text-yellow-50 mt-2 text-center">
                Please login to use the AI assistant
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default ChatBot
