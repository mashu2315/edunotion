const User = require("../models/User")
const Gemini = require("../models/Gemini")
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
   let response = await geminiGenerate(data);

    // Save question and answer to DB
    await Gemini.create({
        question:data,
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