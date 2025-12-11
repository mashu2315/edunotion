const User = require("../models/User")
const Gemini = require("../models/Gemini")
const Chat = require("../models/Chat")
const {geminiGenerate} = require("../config/Gemini");

exports.getAIText = async (req,res)=>{
    try {
        const {data} = req.body;
        const id = req.user?.id;
        
        if(!id){
            return res.status(401).json({
                success:false,
                message:"please login to use assitant."
            })
        }
        
        if(!data){
            return res.status(400).json({
                success:false,
                message:"Please ask something?"
            })
        }

        // Save user message to Chat collection
        await Chat.create({
            message: data,
            sender: "user",
            user: id,
        });

        // Get AI response
        let response = await geminiGenerate(data);

        // Save bot response to Chat collection
        await Chat.create({
            message: response,
            sender: "bot",
            user: id,
        });

        // Also save to Gemini collection for backward compatibility
        await Gemini.create({
            question: data,
            response: response,
            user: id,
        });

        return res.status(200).json({
            success:true,
            message:"Gemini Worked Successfully",
            response,
        });

    } catch (err){
        console.log("Error in gemini controller",err);
        res.status(500).json({
            success:false,
            message:"Internal Server error",
            error:err.message,
        })
    }
}

// Get chat history for the logged-in user
exports.getChatHistory = async (req, res) => {
    try {
        const id = req.user?.id;
        
        if(!id){
            return res.status(401).json({
                success:false,
                message:"please login to view chat history."
            })
        }

        // Get all messages for this user, sorted by creation date
        const messages = await Chat.find({ user: id })
            .sort({ createdAt: 1 }) // Sort by oldest first
            .select("message sender createdAt")
            .lean();

        // Transform messages to match frontend format
        const formattedMessages = messages.map(msg => ({
            text: msg.message,
            sender: msg.sender,
            timestamp: msg.createdAt,
        }));

        return res.status(200).json({
            success: true,
            message: "Chat history retrieved successfully",
            messages: formattedMessages,
        });

    } catch (err) {
        console.log("Error in getChatHistory controller", err);
        res.status(500).json({
            success: false,
            message: "Internal Server error",
            error: err.message,
        });
    }
}

// Clear chat history for the logged-in user
exports.clearChatHistory = async (req, res) => {
    try {
        const id = req.user?.id;
        
        if(!id){
            return res.status(401).json({
                success:false,
                message:"please login to clear chat history."
            })
        }

        await Chat.deleteMany({ user: id });

        return res.status(200).json({
            success: true,
            message: "Chat history cleared successfully",
        });

    } catch (err) {
        console.log("Error in clearChatHistory controller", err);
        res.status(500).json({
            success: false,
            message: "Internal Server error",
            error: err.message,
        });
    }
}