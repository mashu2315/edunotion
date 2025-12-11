import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { aiEndpoints } from "../apis"

const { AI_ASSISTANT_API, AI_CHAT_HISTORY_API, AI_CLEAR_HISTORY_API } = aiEndpoints

export async function sendMessageToAI(token, question) {
  const toastId = toast.loading("AI is thinking...")
  try {
    const response = await apiConnector(
      "POST",
      AI_ASSISTANT_API,
      { data: question },
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    toast.dismiss(toastId)
    toast.success("Response received!")
    return response.data.response
  } catch (error) {
    console.log("AI ASSISTANT API ERROR............", error)
    toast.dismiss(toastId)
    toast.error(error.response?.data?.message || "Failed to get AI response")
    throw error
  }
}

export async function getChatHistory(token) {
  try {
    const response = await apiConnector(
      "GET",
      AI_CHAT_HISTORY_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    return response.data.messages || []
  } catch (error) {
    console.log("GET CHAT HISTORY API ERROR............", error)
    // Don't show toast for history loading errors, just return empty array
    return []
  }
}

export async function clearChatHistory(token) {
  const toastId = toast.loading("Clearing chat history...")
  try {
    const response = await apiConnector(
      "DELETE",
      AI_CLEAR_HISTORY_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    toast.dismiss(toastId)
    toast.success("Chat history cleared!")
    return true
  } catch (error) {
    console.log("CLEAR CHAT HISTORY API ERROR............", error)
    toast.dismiss(toastId)
    toast.error(error.response?.data?.message || "Failed to clear chat history")
    return false
  }
}
