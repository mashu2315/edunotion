 const jwt = require('jsonwebtoken');
 require('dotenv').config();
    const User = require('../models/User');
 // auth
exports.auth = async (req,res,next)=>{
    try{
        //extract token from header
        const token = req.cookies.token
                    || req.body.token
                    || req.header("Authorization").replace("Bearer ","");
        //if token is missing
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing"
            });
        }
        // verify the token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        } catch (error){
            // verification - issue
            return res.status(401).json({
                success:false,
                message:"Token is invalid"
            });
        }
        next();
    } catch (err){
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token.'
        });

    } 
}
 // isStudent
exports.isStudent  = async (req,res,next)=>{
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route fot students only"
            });
        } next();
    } catch (err){
        console.log(err);
        return res.status(401).json({
            success:false,
            message:"Something went wrong while verifying the role"
        });
    }
}  
 // isInstructor
exports.isInstructor  = async (req,res,next)=>{
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for instructor only"
            });
        } next();
    } catch (err){
        console.log(err);
        return res.status(401).json({
            success:false,
            message:"Something went wrong while verifying the role"
        });
    }
}  

 // isAdmin
exports.isAdmin  = async (req,res,next)=>{
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route fot Admin only"
            });
        } next();
    } catch (err){
        console.log(err);
        return res.status(401).json({
            success:false,
            message:"Something went wrong while verifying the role"
        });
    }
}  
