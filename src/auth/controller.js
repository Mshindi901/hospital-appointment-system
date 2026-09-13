import User from "./schema.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import logger from '../config/logger.js';
dotenv.config();

export const signup = async(req, res) => {
    try {
        const {hospital_id, name, email, password, role} = req.body;
        if(!name || !email || !password || !role){
            logger.warn('Signup attempt rejected: missing required fields', { hospital_id: hospital_id || null, name: name || null, email: email || null, role: role || null });
            return res.status(400).json({success: false, message: 'Internal Server Error'});
        };

        const isUser = await User.findOne({where:{email: email}});
        if(isUser){
            logger.warn('Signup attempt rejected: email already exists', { email });
            return res.status(400).json({success: false, message: 'Email exists already'});
        };

        const hashedPassword = await bcrypt.hash(password, 12);
        const new_user = await User.create({hospital_id: hospital_id || null, name, email, password: hashedPassword, role});

        logger.info('User signed up successfully', { userId: new_user.id, email, role });
        return res.status(201).json({success: true, message: 'User Signed up'})
    } catch (error) {
        logger.error('Error while signing up user', { error: error.message, stack: error.stack });
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const signin = async(req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            logger.warn('Signin attempt rejected: missing email or password', { email: email || null });
            return res.status(400).json({success: false, message: 'Provide email and password'});
        };

        const isUser = await User.findOne({where:{email: email}});
        if(!isUser){
            logger.warn('Signin attempt rejected: email not found', { email });
            return res.status(400).json({success: false, messsage: 'Email not found'});
        };

        const isPassword = await bcrypt.compare(password, isUser.password);
        if(!isPassword){
            logger.warn('Signin attempt rejected: wrong password', { userId: isUser.id, email });
            return res.status(400).json({success: false, message: 'Wrong Password'})
        };

        const token = jwt.sign({id: isUser.id, role: isUser.role, name: isUser.name}, process.env.ACCESS_TOKEN, {expiresIn: '1h'});

        logger.info('User signed in successfully', { userId: isUser.id, email, role: isUser.role });
        return res.status(200).json({success: true, message: 'User signed in', data: token})
    } catch (error) {
        logger.error('Error while signing in user', { error: error.message, stack: error.stack });
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};