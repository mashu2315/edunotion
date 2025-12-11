const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    sender: {
        type: String,
        enum: ["user", "bot"],
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Index for faster queries
chatMessageSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model("Chat", chatMessageSchema);
