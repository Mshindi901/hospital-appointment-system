import User from "./schema.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const signup = async(req, res) => {
    try {
        const {hospital_id, name, email, password, role} = req.body;
        if(!hospital_id || !name || !email || !password || !role){
            return res.status(400).json({success: false, message: 'Internal Server Error'});
        };
        const isUser = await User.findOne({where:{email: email}});
        if(isUser){
            return res.status(400).json({success: false, messsage: 'Email exists already'});
        };
        const hashedPassword = await bcrypt.hash(password, 12);
        const new_user = await User.create({hospital_id, name, email, password: hashedPassword, role});
        return res.status(201).json({success: true, message: 'User Signed up'})
    } catch (error) {
        console.error(`Error with signing up user ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const signin = async(req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({success: false, message: 'Provide email and password'});
        };
        const isUser = await User.findOne({where:{email: email}});
        if(!isUser){
            return res.status(400).json({success: false, messsage: 'Email not found'});
        };
        const isPassword = await bcrypt.compare(password, isUser.password);
        if(!isPassword){
            return res.status(400).json({success: false, message: 'Wrong Password'})
        };
        const token = jwt.sign({id: isUser.id}, process.env.ACESS_TOKEN, {expiresIn: '1h'});
        return res.status(200).json({success: true, message: 'User signed in', data: token})
    } catch (error) {
        console.error(`Error with signing in user ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};