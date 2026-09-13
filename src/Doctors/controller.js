import Doctor from "./schema.js";
import logger from "../config/logger.js";

export const newRecord = async(req, res) => {
    try {
        const {user_id, hospital_id, type, available_days} = req.body;
        if(!user_id || !hospital_id || !type || !available_days){
            logger.warn('Doctor record creation rejected: missing required fields', { user_id: user_id || null, hospital_id: hospital_id || null, type: type || null });
            return res.status(400).json({success: false, message: 'Provide all info'})
        };
        const new_record = await Doctor.create({user_id, hospital_id, type, available_days});
        if(!new_record){
            logger.warn('Doctor record creation failed: create returned null', { user_id, hospital_id, type });
            return res.status(404).json({success: false, message: 'failed to add record'})
        };
        logger.info('Doctor record created', { doctorId: new_record.id, user_id, hospital_id, type });
        return res.status(201).json({success: true, message: 'record added'})
    } catch (error) {
        logger.error('Error creating doctor record', { error: error.message, stack: error.stack });
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const getRecordById = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            logger.warn('Doctor lookup rejected: missing id');
            return res.status(400).json({success: false, message: 'Provide Record Id'})
        };
        const doctor = await Doctor.findByPk(id);
        if(!doctor){
            logger.warn('Doctor lookup failed: invalid id', { id });
            return res.status(404).json({success: false, message: 'Invalid Id'})
        };
        logger.info('Doctor record fetched by id', { doctorId: doctor.id });
        return res.status(200).json({success: true, message: 'Fetched Record', data: doctor});
    } catch (error) {
        logger.error('Error fetching doctor by id', { id: req.params.id, error: error.message, stack: error.stack });
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const getRecordByUser = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            logger.warn('Doctor lookup by user rejected: missing id');
            return res.status(400).json({success: false, message: 'Provide Record Id'})
        };
        const doctors = await Doctor.findAll({where: {user_id: id}});
        if(!doctors || doctors.length == 0){
            logger.warn('Doctor lookup by user returned no records', { userId: id });
            return res.status(404).json({success: false, message: 'No records fetched'})
        };
        logger.info('Doctor records fetched by user', { userId: id, count: doctors.length });
        return res.status(200).json({success: true, message: 'fetched record', data: doctors})
    } catch (error) {
        logger.error('Error fetching doctors by user', { userId: req.params.id, error: error.message, stack: error.stack });
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const getRecordByHospital = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            logger.warn('Doctor lookup by hospital rejected: missing id');
            return res.status(400).json({success: false, message: 'Provide Record Id'})
        };
        const doctors = await Doctor.findAll({where:{hospital_id: id}});
        if(!doctors || doctors.length == 0){
            logger.warn('Doctor lookup by hospital returned no records', { hospitalId: id });
            return res.status(404).json({success: false, message: 'No records fetched'})
        };
        logger.info('Doctor records fetched by hospital', { hospitalId: id, count: doctors.length });
        return res.status(200).json({success: true, message: 'fetched record', data: doctors});
    } catch (error) {
        logger.error('Error fetching doctors by hospital', { hospitalId: req.params.id, error: error.message, stack: error.stack });
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
};

export const updateRecord = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            logger.warn('Doctor update rejected: missing id');
            return res.status(400).json({success: false, message: 'Provide Record Id'})
        };
        const {user_id, hospital_id, type, available_days} = req.body;
        const doctor = await Doctor.findByPk(id);
        if(!doctor){
            logger.warn('Doctor update failed: invalid id', { id });
            return res.status(404).json({success: false, message: 'Invalid Id'})
        };
        const updated_record = await doctor.update({user_id, hospital_id, type, available_days});
        logger.info('Doctor record updated', { doctorId: updated_record.id, user_id, hospital_id, type });
        return res.status(200).json({success: true, message: 'record updated'})
    } catch (error) {
        logger.error('Error updating doctor record', { doctorId: req.params.id, error: error.message, stack: error.stack });
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const deleteRecord = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            logger.warn('Doctor delete rejected: missing id');
            return res.status(400).json({success: false, message: 'Provide Record Id'})
        };
        const doctor = await Doctor.findByPk(id);
        if(!doctor){
            logger.warn('Doctor delete failed: invalid id', { id });
            return res.status(404).json({success: false, message: 'Invalid Id'})
        };
        await doctor.destroy();
        logger.info('Doctor record deleted', { doctorId: doctor.id });
        return res.status(200).json({success: true, message: 'Record deleted'})
    } catch (error) {
        logger.error('Error deleting doctor record', { doctorId: req.params.id, error: error.message, stack: error.stack });
        return res.status(500).json({success: false, message: 'Internal server Error'})
    }
};