import User from "../auth/schema.js";
import bcrypt from "bcryptjs";

export const getRecordById = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide Id'})
        };
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({success: false, message: 'Invalid Id'})
        };
        return res.status(200).json({success: true, message: 'Fetched Info', data: user})
    } catch (error) {
        console.error(`Error with getting record by Id ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
};

export const getRecordsByHospital = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide Hospital ID'})
        };
        const users = await User.findAll({where:{hospital_id: id}});
        if(!users || users.length == 0){
            return res.status(404).json({success: false, message: 'No users fetched'})
        };
        return res.status(200).json({success: true, message: 'Fetched Users', data: users})
    } catch (error) {
        console.error(`Error with getting records by Hospital Id ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const getAllRecords = async(req, res) => {
    try {
        const users = await User.findAll();
        if(!users || users.length == 0){
            return res.status(404).json({success: false, message: 'No users fetched'})
        };
        return res.status(200).json({success: true, message: 'Fetched Users', data: users})
    } catch (error) {
        console.error(`Error with fetching all records ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const updatePassword = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide Id'})
        };
        const {new_password} = req.body;
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({success: false, message: 'Invalid Id'})
        };
        const is_passowrd = await bcrypt.compare(new_password, user.password);
        if(is_passowrd){
            return res.status(400).json({success: false, message: 'Entered current pasword'});
        };
        const updated_user = await user.update({passowrd: new_password});
        return res.status(200).json({success: true, message: 'updated passowrd'})
    } catch (error) {
        console.error(`Error with updating column password in record ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const updateRecord = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide Id'})
        };
        const {name, email} = req.body;
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({success: false, message: 'Invalid Id'})
        };
        const updated_user = await user.update({name, email});
        return res.status(200).json({success: true, message: 'Updated User'})
    } catch (error) {
        console.error(`Error with updating record ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const deleteRecord = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide Id'})
        };
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({success: false, message: 'Invalid Id'})
        };
        await user.destroy();
        return res.status(200).json({success: true, message: 'Deleted User'})
    } catch (error) {
        console.error(`Error with deleting the record ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
};