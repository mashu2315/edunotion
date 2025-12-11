const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

exports.geminiGenerate = async (prompt) => {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    console.log(result.text);
    return result.text;
  } catch (err) {
    console.log("Error in generating content: ", err);
    throw err; // Let the controller handle the error
  }
};