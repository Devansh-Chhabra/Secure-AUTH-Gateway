import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail, sendResetPasswordEmail, sendResetSuccessMail } from "../mailtrap/email.js";

import bcrypt from "bcryptjs";
import crypto from "crypto";

export const checkAuth = async (req,res) => {
    try{
        const user = await User.findById(req.userId).select("-password");
        if(!user){
            throw new Error("User not Found");
        }

        res.status(200).json({
            success: true,
            message: "User Verified successfully",
            user
        });        
    }
    catch(error){
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

export const signup = async (req,res) => {
    const {email,password,name} = req.body;
    try{
        if(!email || !password || !name){
            throw new Error("All fields are required");
        }

        const userAlreadyExists = await User.findOne({email});
        if(userAlreadyExists){
            throw new Error("User Already Exists");
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const verificationToken = Math.floor(10000 + Math.random() * 90000).toString();

        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 1 * 60 * 60 * 1000
        })
        await user.save();

        await generateTokenAndSetCookie(res,user._id);

        await sendVerificationEmail(user.email,verificationToken);

        res.status(200).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        });
    }
    catch(error){
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

export const verifyEmail = async (req,res) => {
    const {code} = req.body;
    try{
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: {$gt: Date.now()}
        })
        
        if(!user){
            throw new Error("Invalid or Expired Token");
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email,user.name);

        res.status(200).json({
            success: true,
            message: "E-Mail verified successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        });
    }
    catch(error){
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

export const login = async (req,res) => {
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            throw new Error("Invalid Credentials");
        }

        const isValidPassword = await bcrypt.compare(password,user.password);
        if(!isValidPassword){
            throw new Error("Invalid Credentials");
        }

        await generateTokenAndSetCookie(res,user._id);

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: "User login successful",
            user: {
                ...user._doc,
                password: undefined
            }
        });
    }
    catch(error){
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

export const forgotPassword = async (req,res) => {
    const {email} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            throw new Error("Invalid E-Mail");
        }

        const resetPasswordToken = crypto.randomBytes(20).toString("hex");
        const resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

        user.resetPasswordToken = resetPasswordToken;
        user.resetPaswordExpiresAt = resetPasswordExpiresAt;
        await user.save();

        await sendResetPasswordEmail(email,`${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`);

        res.status(200).json({
            success: true,
            message: "Password Reset Link Delivered"
        });
    }
    catch(error){
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

export const resetPassword = async (req,res) => {
    const {password} = req.body;
    const {token} = req.params;
    try{
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPaswordExpiresAt: {$gt: Date.now()}
        });

        if(!user){
            throw new Error("Invalid or Expired Reset Token");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPaswordExpiresAt = undefined;
        await user.save();

        await sendResetSuccessMail(user.email);

        res.status(200).json({
            success: true,
            message: "Password Successfully Reset"
        });
    }
    catch(error){
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

export const logout = async (req,res) => {
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: "Logged Out Successfully"
    });
}