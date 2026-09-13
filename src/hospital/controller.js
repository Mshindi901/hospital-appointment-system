import Hospital from "./schema.js";
import logger from "../utils/logger.js";

export const newRecord = async(req, res) => {
    try {
        const {name, contacts, location} = req.body;
        if(!name || !location){
            logger.warn('Hospital creation rejected: missing required fields', { name: name || null, location: location || null });
            return res.status(400).json({success: false, message: 'Provide Full info'})
        };
        const new_record = await Hospital.create({name, contacts, location});
        if(!new_record){
            logger.warn('Hospital creation failed: create returned null', { name, location });
            return res.status(404).json({success: false, message: 'Failed to create new Record'});
        };
        logger.info('Hospital record created', { hospitalId: new_record.id, name, location });
        return res.status(201).json({success: true, message: 'hospital record added'})
    } catch (error) {
        logger.error('Error creating hospital record', { error: error.message, stack: error.stack });
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
};

export const getRecordById = async(req, res) => {
    try {
        const {id} =req.params;
        if(!id){
            logger.warn('Hospital fetch by id rejected: missing id');
            return res.status(400).json({success: false, message: 'Provide Id'})
        };
        const hospital = await Hospital.findByPk(id);
        if(!hospital){
            logger.warn('Hospital fetch by id failed: invalid id', { id });
            return res.status(404).json({success: false, message: 'no Hospital fetched'})
        };
        logger.info('Hospital record fetched by id', { hospitalId: hospital.id });
        return res.status(200).json({success: true, message: 'Fetched hospital', data: hospital })
    } catch (error) {
        logger.error('Error fetching hospital by id', { hospitalId: req.params.id, error: error.message, stack: error.stack });
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
};

export const getRecordByName = async(req, res) => {
    try {
        const name = req.query?.name || req.body?.name;

        if(!name){
            const hospitals = await Hospital.findAll();
            logger.info('Hospital list fetched', { count: hospitals.length });
            return res.status(200).json({success: true, message: 'Hospitals fetched', data: hospitals || []});
        };

        const hospital = await Hospital.findOne({where:{name}});
        if(!hospital){
            logger.warn('Hospital fetch by name returned no result', { name });
            return res.status(404).json({success: false, message: 'failed to fetch'})
        };
        logger.info('Hospital record fetched by name', { hospitalId: hospital.id, name });
        return res.status(200).json({success: true, message: 'hospital fetched', data: hospital})
    } catch (error) {
        logger.error('Error fetching hospital by name', { name: req.query?.name || req.body?.name || null, error: error.message, stack: error.stack });
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const updateRecord = async(req, res) => {
    try {
        const {id} =req.params;
        if(!id){
            logger.warn('Hospital update rejected: missing id');
            return res.status(400).json({success: false, message: 'Provide Id'})
        };
        const {user_id, name, contacts, location} = req.body;
        if(!user_id ||!name || !location){
            logger.warn('Hospital update rejected: missing required fields', { hospitalId: id, user_id: user_id || null, name: name || null, location: location || null });
            return res.status(400).json({success: false, message: 'Provide Full info'})
        };
        const hospital = await Hospital.findByPk(id);
        if(!hospital){
            logger.warn('Hospital update failed: invalid id', { id });
            return res.status(404).json({success: false, message: 'no Hospital fetched'})
        };
        const updated_hospital = await hospital.update({user_id, name, contacts, location});
        logger.info('Hospital record updated', { hospitalId: updated_hospital.id, name, location });
        return res.status(200).json({success: true, message: 'Updated record'})
    } catch (error) {
        logger.error('Error updating hospital record', { hospitalId: req.params.id, error: error.message, stack: error.stack });
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
};

export const deleteRecord = async(req, res) => {
    try {
        const {id} =req.params;
        if(!id){
            logger.warn('Hospital delete rejected: missing id');
            return res.status(400).json({success: false, message: 'Provide Id'})
        };
        const hospital = await Hospital.findByPk(id);
        if(!hospital){
            logger.warn('Hospital delete failed: invalid id', { id });
            return res.status(404).json({success: false, message: 'no Hospital fetched'})
        };
        await hospital.destroy();
        logger.info('Hospital record deleted', { hospitalId: hospital.id, name: hospital.name });
        return res.status(200).json({success: true, message: 'deleted record'})
    } catch (error) {
        logger.error('Error deleting hospital record', { hospitalId: req.params.id, error: error.message, stack: error.stack });
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
};