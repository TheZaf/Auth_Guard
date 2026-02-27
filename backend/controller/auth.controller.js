import bcrypt from 'bcryptjs';
import crypto from 'crypto'

import {User} from '../model/user.model.js';
import { generateToken } from '../utils/generatetoken.js';
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from '../mailtrap/email.js';

export const signUp = async (req, res) => {
    const {name,email,password} = req.body;
    try {
        if(!name || !email || !password){
            return res.status(400).json({message:"All fields are required"})
        }
        const existUser = await User.findOne({email});
        if(existUser){
            return res.status(400).json({message:"User already exist"})
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const user = new User({
            name,
            email,
            password:hashedPassword,
            verificationToken,
            verificationTokenexpiresat:Date.now() + 24 * 60 * 60 * 1000 // 24h
        })

        await user.save();          //save user to database
        generateToken(res,user._id);//generate token and set cookie

        sendVerificationEmail(email,verificationToken)

        res.status(201).json({
            message:"user created successfully",
            user:{
                ...user._doc,
                password:undefined,
            },
        })
        
    } catch (error) {
        console.log("error in sign up controller",error);
        res.status(500).json({message:"Internal server error"})
    }
}

export const logIn = async (req,res) =>{
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message:"User not found!"});

        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid) return res.status(400).json({message:"Invalid credentials!"});

        generateToken(res,user._id);
        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            message:"Logged in successfully",
            user:{
                ...user._doc,
                password:undefined
            },
        });
    } catch (error) {
        console.log("error in login controller",error);
        res.status(500).json({message:"Internal server error"});
    }
}

export const logOut = async (req,res) =>{
    try {
        res.clearCookie("token");
        res.status(200).json({message:"Logged out successfully"});
    } catch (error) {
        console.log("error in logout controller",error);
        throw new Error("Error in logout",error);
    }
}

export const verifyEmail = async (req,res) =>{
    const {code} = req.body;
    try {
        const user = await User.findOne({
            verificationToken:code,
            verificationTokenexpiresat:{$gt:Date.now()}
        })
        if(!user){
            return res.status(400).json({message:"Invalid or expired verification code"})
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenexpiresat = undefined;
        await user.save();

        sendWelcomeEmail(user.email,user.name);

        res.status(200).json({
            message:"Email verified successfully",
            user:{
                ...user._doc,
                password:undefined,
            }
        })
    } catch (error) {
        console.log("error in email verification controller",error);
        throw new Error("Error in email verification",error);
    }

}

export const forgetPassword = async (req,res) =>{
    const {email} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message:"User not Found!"});

        //reset token generate
        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokemExpiresAt = Date.now() + 1 * 60 * 60 * 1000;//1h

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokemExpiresAt;

        await user.save();

        await sendPasswordResetEmail(user.email,`${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        res.status(200).json({message:"password reset email sent successfully"});
    }
    catch(error){
        console.log("error in forget password controller",error);
        throw new Error("Error in forget password",error);
    }

}

export const resetPassword = async (req,res) =>{
    try {
        const {token} = req.params;
        const{password} = req.body;
        
        const user = await User.findOne({
            resetPasswordToken:token,
            resetPasswordExpiresAt:{$gt:Date.now()},
        });
        if(!user) return res.status(400).json({message:"Invalid or expired password reset token"});
        const hashedPassword = await bcrypt.hash(password,10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;

        await user.save();

        sendResetSuccessEmail(user.email)

        res.status(200).json({message:"Password reset successfull"})
    } catch (error) {
        console.log("error in reset password controller",error);
        throw new Error("Error in reset password",error);
    }
}

export const checkAuth = async (req,res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if(!user) return res.status(401).json({message:"user not found!"});

        res.status(200).json({user})
    } catch (error) {
        console.log("error in checkauth controller",error);
        res.status(500).json({message:"Internal server error"})      
    }

}