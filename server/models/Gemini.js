const mongoose = require("mongoose");

const aiSchema = new mongoose.Schema({
    question: {
        type: String,
        require:true,
    },
    response: {
        type: String,
        require:true,
    },
    user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "user",
        },
        createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, 
  }

})


module.exports = mongoose.model("Gemini",aiSchema);

