import User from "../auth/schema.js";
import bcrypt from "bcryptjs";
import logger from "../config/logger.js";

export const getRecordById = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            logger.warn('User fetch by id rejected: missing id');
            return res.status(400).json({success: false, message: 'Provide Id'})
        };
        const user = await User.findByPk(id);
        if(!user){
            logger.warn('User fetch by id failed: invalid id', { id });
            return res.status(404).json({success: false, message: 'Invalid Id'})
        };
        logger.info('User record fetched by id', { userId: user.id });
        return res.status(200).json({success: true, message: 'Fetched Info', data: user})
    } catch (error) {
        logger.error('Error fetching user by id', { userId: req.params.id, error: error.message, stack: error.stack });
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
};

export const getRecordsByHospital = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            logger.warn('User fetch by hospital rejected: missing id');
            return res.status(400).json({success: false, message: 'Provide Hospital ID'})
        };
        const users = await User.findAll({where:{hospital_id: id}});
        if(!users || users.length == 0){
            logger.warn('User fetch by hospital returned no records', { hospitalId: id });
            return res.status(404).json({success: false, message: 'No users fetched'})
        };
        logger.info('Users fetched by hospital', { hospitalId: id, count: users.length });
        return res.status(200).json({success: true, message: 'Fetched Users', data: users})
    } catch (error) {
        logger.error('Error fetching users by hospital', { hospitalId: req.params.id, error: error.message, stack: error.stack });
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const getAllRecords = async(req, res) => {
    try {
        const users = await User.findAll();
        if(!users || users.length == 0){
            logger.warn('User fetch all returned no records');
            return res.status(404).json({success: false, message: 'No users fetched'})
        };
        logger.info('All users fetched', { count: users.length });
        return res.status(200).json({success: true, message: 'Fetched Users', data: users})
    } catch (error) {
        logger.error('Error fetching all users', { error: error.message, stack: error.stack });
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const updatePassword = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            logger.warn('Password update rejected: missing id');
            return res.status(400).json({success: false, message: 'Provide Id'})
        };
        const {new_password} = req.body;
        const user = await User.findByPk(id);
        if(!user){
            logger.warn('Password update failed: invalid id', { id });
            return res.status(404).json({success: false, message: 'Invalid Id'})
        };
        const is_passowrd = await bcrypt.compare(new_password, user.password);
        if(is_passowrd){
            logger.warn('Password update rejected: entered current password', { userId: user.id });
            return res.status(400).json({success: false, message: 'Entered current pasword'});
        };
        const updated_user = await user.update({password: new_password});
        logger.info('User password updated', { userId: updated_user.id });
        return res.status(200).json({success: true, message: 'updated passowrd'})
    } catch (error) {
        logger.error('Error updating user password', { userId: req.params.id, error: error.message, stack: error.stack });
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const updateRecord = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            logger.warn('User update rejected: missing id');
            return res.status(400).json({success: false, message: 'Provide Id'})
        };
        const {name, email} = req.body;
        const user = await User.findByPk(id);
        if(!user){
            logger.warn('User update failed: invalid id', { id });
            return res.status(404).json({success: false, message: 'Invalid Id'})
        };
        const updated_user = await user.update({name, email});
        logger.info('User record updated', { userId: updated_user.id, name, email });
        return res.status(200).json({success: true, message: 'Updated User'})
    } catch (error) {
        logger.error('Error updating user record', { userId: req.params.id, error: error.message, stack: error.stack });
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const deleteRecord = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            logger.warn('User delete rejected: missing id');
            return res.status(400).json({success: false, message: 'Provide Id'})
        };
        const user = await User.findByPk(id);
        if(!user){
            logger.warn('User delete failed: invalid id', { id });
            return res.status(404).json({success: false, message: 'Invalid Id'})
        };
        await user.destroy();
        logger.info('User record deleted', { userId: user.id, email: user.email });
        return res.status(200).json({success: true, message: 'Deleted User'})
    } catch (error) {
        logger.error('Error deleting user record', { userId: req.params.id, error: error.message, stack: error.stack });
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
};