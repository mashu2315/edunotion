const express = require("express")
const {auth} = require("../middlewares/auth")
const router = express.Router()
const {getAIText, getChatHistory, clearChatHistory}  = require("../controllers/Gemini")

router.post("/assistant", auth, getAIText)
router.get("/history", auth, getChatHistory)
router.delete("/history", auth, clearChatHistory)

module.exports = router