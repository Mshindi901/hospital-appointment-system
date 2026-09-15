import Patient from "./schema.js";
import logger from "../config/logger.js";

export const newRecord = async(req, res) => {
    try {
        const {hospital_id, name, email, address, gender, dob, allergies, blood_type} = req.body;
        if(!hospital_id || !name || !email){
            logger.warn('Patient creation rejected: missing required fields', { hospital_id: hospital_id || null, name: name || null, email: email || null, gender: gender || null, dob: dob || null, address: address || null, blood_type: blood_type || null});
            return res.status(400).json({success: false, message: 'Provide Full info'})
        };
        const new_record = await Patient.create({hospital_id, name, email, address});
        if(!new_record){
            logger.warn('Patient creation failed: create returned null', { hospital_id, name, email });
            return res.status(404).json({success: false, message: 'failed to add record'});
        };
        logger.info('Patient record created', { patientId: new_record.id, hospital_id, name, email });
        return res.status(201).json({success: true, message: 'Record added'});
    } catch (error) {
        logger.error('Error creating patient record', { error: error.message, stack: error.stack });
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const getRecordById = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            logger.warn('Patient fetch by id rejected: missing id');
            return res.status(400).json({success: false, message: 'Provide Id'});
        };
        const patient = await Patient.findByPk(id);
        if(!patient){
            logger.warn('Patient fetch by id failed: invalid id', { id });
            return res.status(404).json({success: false, message: 'Invalid Id'});
        };
        logger.info('Patient record fetched by id', { patientId: patient.id });
        return res.status(200).json({success: true, message: 'Record Fetched', data: patient})
    } catch (error) {
        logger.error('Error fetching patient by id', { patientId: req.params.id, error: error.message, stack: error.stack });
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
};

export const getRecordByHospitals = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            logger.warn('Patient fetch by hospital rejected: missing id');
            return res.status(400).json({success: false, message: 'Provide Id'});
        };
        const patients = await Patient.findAll({where: {hospital_id: id}});
        if(!patients || patients.length == 0){
            logger.warn('Patient fetch by hospital returned no records', { hospitalId: id });
            return res.status(404).json({success: false, message: 'No Patients Fetched'})
        };
        logger.info('Patient records fetched by hospital', { hospitalId: id, count: patients.length });
        return res.status(200).json({success: true, message: 'Record Fetched', data: patients})
    } catch (error) {
        logger.error('Error fetching patients by hospital', { hospitalId: req.params.id, error: error.message, stack: error.stack });
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const updateRecord = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            logger.warn('Patient update rejected: missing id');
            return res.status(400).json({success: false, message: 'Provide Id'});
        };
        const {hospital_id, name, email, address, gender, dob, allergies, blood_type} = req.body;
        const patient = await Patient.findByPk(id);
        if(!patient){
            logger.warn('Patient update failed: invalid id', { id });
            return res.status(404).json({success: false, message: 'Invalid Id'});
        };
        const updated_record = await patient.update({hospital_id, name, email, address, gender, dob, allergies, blood_type});
        if(!updated_record){
            logger.warn('Patient update failed: update returned null', { patientId: patient.id });
            return res.status(404).json({success: false, message: 'Failed to update'})
        };
        logger.info('Patient record updated', { patientId: updated_record.id, hospital_id, name, email });
        return res.status(200).json({success: true, message: 'Record updated'})
    } catch (error) {
        logger.error('Error updating patient record', { patientId: req.params.id, error: error.message, stack: error.stack });
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const deleteRecord = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            logger.warn('Patient delete rejected: missing id');
            return res.status(400).json({success: false, message: 'Provide Id'});
        };
        const patient = await Patient.findByPk(id);
        if(!patient){
            logger.warn('Patient delete failed: invalid id', { id });
            return res.status(404).json({success: false, message: 'Invalid Id'});
        };
        await patient.destroy();
        logger.info('Patient record deleted', { patientId: patient.id, name: patient.name });
        return res.status(200).json({success: true, message: 'Record Deleted'})
    } catch (error) {
        logger.error('Error deleting patient record', { patientId: req.params.id, error: error.message, stack: error.stack });
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};