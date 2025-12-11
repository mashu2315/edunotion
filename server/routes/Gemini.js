const express = require("express")
const {auth} = require("../middlewares/auth")
const router = express.Router()
const {getAIText}  = require("../controllers/Gemini")

router.post("/assistant",auth, getAIText)

module.exports = router