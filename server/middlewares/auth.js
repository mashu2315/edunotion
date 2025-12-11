 const jwt = require('jsonwebtoken');
 require('dotenv').config();
    const User = require('../models/User');
 // auth
exports.auth = async (req,res,next)=>{
    try{
        //extract token from header
       // console.log("Header",req.headers);
        
        // let token =req.cookies.token || req.body.token;
        // console.log("BODY",req.body);
        // console.log("Token", token);
        // // Extract token from Authorization header if not found in cookies or body
        // if (!token && req.headers.authorization) {
        //     token = req.headers.authorization.replace("Bearer ", "");
        // }
        const authHeader = req.headers.authorization; // "Bearer <token>"
let token;

if (authHeader && authHeader.startsWith("Bearer ")) {
  token = authHeader.split(" ")[1];
} else if (req.cookies.token) {
  token = req.cookies.token;
} else {
  token = null;
}
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
          //  console.log(decode);
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
                message:"This is ba protected route for instructor only"
            });
        } next();
    } catch (err){
        console.log("Role error",err);
        return res.status(401).json({
            success:false,
            message:"Something went wrong while verifying the role",
            error:err
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
