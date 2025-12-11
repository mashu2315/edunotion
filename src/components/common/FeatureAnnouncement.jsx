import { useState, useEffect } from "react"
import { FaRobot, FaTimes } from "react-icons/fa"
import { PiSparkleFill } from "react-icons/pi"
import { Link } from "react-router-dom"


function FeatureAnnouncement() {
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    // Check if popup has been shown before
    const hasSeenPopup = localStorage.getItem("chatbot-feature-announcement")
    
    if (!hasSeenPopup) {
      // Show popup after a short delay
      const timer = setTimeout(() => {
        setShowPopup(true)
      }, 2000) // 2 seconds delay

      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setShowPopup(false)
    // Mark as seen in localStorage
    localStorage.setItem("chatbot-feature-announcement", "true")
  }

  const handleTryNow = () => {
    handleClose()
    // Scroll to bottom where chatbot button is
    setTimeout(() => {
      window.scrollTo({ bottom: 0, behavior: "smooth" })
    }, 100)
  }

  if (!showPopup) return null

  return (
    <div className="fixed inset-0 z-[9999] !mt-0 grid place-items-center overflow-auto bg-black bg-opacity-60 backdrop-blur-sm animate-fade-in">
      <div className="w-11/12 max-w-[500px] rounded-2xl border-2 border-blue-500 bg-gradient-to-br from-richblack-900 via-richblack-800 to-richblack-900 p-6 shadow-2xl animate-slide-up relative overflow-hidden">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-caribbeangreen-600/20 to-blue-600/20 opacity-50"></div>
        
        {/* Sparkle decoration */}
        <div className="absolute top-4 right-4 text-yellow-50 animate-pulse">
          <PiSparkleFill className="text-2xl" />
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-500 to-caribbeangreen-500 p-3 rounded-full">
                <FaRobot className="text-2xl text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">New Feature!</h2>
                <p className="text-sm text-richblack-300">AI Assistant is here</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-richblack-400 hover:text-white transition-colors duration-200 p-1 hover:bg-richblack-700 rounded-full"
              aria-label="Close"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Content */}
          <div className="mb-6">
            <p className="text-richblack-5 text-lg mb-3 leading-relaxed">
              🎉 We're excited to introduce our new <span className="font-bold text-blue-400">AI Assistant</span>!
            </p>
            <div className="space-y-2 text-richblack-300">
              <p className="flex items-start gap-2">
                <span className="text-caribbeangreen-400 mt-1">✓</span>
                <span>Get instant answers to your questions</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-caribbeangreen-400 mt-1">✓</span>
                <span>Chat history saved automatically</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-caribbeangreen-400 mt-1">✓</span>
                <span>Available 24/7 to help you learn</span>
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleTryNow}
              className="flex-1 bg-gradient-to-r from-blue-600 to-caribbeangreen-600 hover:from-blue-700 hover:to-caribbeangreen-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
            >
              Try It Now
            </button>
            <button
              onClick={handleClose}
              className="px-6 py-3 bg-richblack-700 hover:bg-richblack-600 text-richblack-5 font-semibold rounded-lg transition-colors duration-200"
            >
              Maybe Later
            </button>
          </div>

          {/* Footer note */}
          <p className="text-xs text-richblack-400 text-center mt-4">
            Look for the AI button in the bottom-right corner
          </p>
        </div>
      </div>
    </div>
  )
}

export default FeatureAnnouncement;
