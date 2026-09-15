import Staff from "./schema.js";
import logger from "../config/logger.js";

export const newStaffRecord = async(req, res) => {
    try {
        const {user_id, hospital_id, department} =req.body;
        if(!user_id || !hospital_id || !department){
            logger.info('Did not Provide all info');
            return res.status(400).json({success: false, message: 'Provide Full info'});
        };
        const new_record = await Staff.create({user_id, hospital_id, department});
        if(!new_record){
            logger.error('Database Failed to create new record for staffs');
            return res.status(404).json({success: false, message: 'Failed to create record'});
        };
        logger.info('New Staff Record Created');
        return res.status(201).json({success: true, message: 'Record added'});
    } catch (error) {
        console.error(`Error with creating a new staff record ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const getStaffByHospital = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            logger.error('No hospita id provide, trying to access staff');
            return res.status(400).json({success: false, message: 'Provide hospital Id'})
        };
        const records = await Staff.findAll({where:{hospital_id: id}});
        if(!records || records.length == 0){
            logger.error('The Api failed to fetch staff by hospital id check logs');
            return res.status(404).json({success: false, message: 'No records Fetched'})
        };
        return res.status(200).json({success: true, message: 'Records Fetched', data: records})
    } catch (error) {
        console.error(`Error with getting staff by hospital ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const getStaffByUser = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide User id'})
        };
        const staff = await Staff.findOne({where:{user_id: id}});
        if(!staff){
            return res.status(404).json({success: false, message: 'NO record fetched'});
        };
        return res.status(200).json({success: true, message: 'Records Fetched', data: staff})
    } catch (error) {
        console.error(`Error with getting record by user ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const getStaffById = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide record id'});
        };
        const record = await Staff.findByPk(id);
        if(!record){
            return res.status(404).json({success: false, message: 'Invalid Id'});
        };
        return res.status(200).json({success: true, message: 'Record Fetched', data: record})
    } catch (error) {
        console.error(`Error with getting staff by record id ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const updateStaff = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide record id'});
        };
        const {user_id, hospital_id, department} =req.body;
        const record = await Staff.findByPk(id);
        if(!record){
            return res.status(404).json({success: false, message: 'Invalid Id'});
        };
        const updated_record = await record.update({user_id, hospital_id, department});
        if(!updated_record){
            return res.status(404).json({success: false, message: 'Record updated'})
        };
        return res.status(200).json({success: true, message: 'Updated record'})
    } catch (error) {
        console.error(`Error with updating staff ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const deleteStaff = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide record id'});
        };
        const record = await Staff.findByPk(id);
        if(!record){
            return res.status(404).json({success: false, message: 'Invalid Id'});
        };
        await record.destroy();
        return res.status(200).json({success: true, message: 'Deleted Record'});
    } catch (error) {
        console.error(`Error with deleting the staff record ${error}`);
        return res.status(500).json({success: false,  message: 'Internal Server Error'});
    }
};