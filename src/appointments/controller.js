import Appointment from "./schema.js";
import logger from "../utils/logger.js";

export const newRecord = async(req, res) => {
    try {
        const {patient_id, doctor_id, hospital_id, date, start_time} = req.body;
        if(!patient_id || !doctor_id || !hospital_id || !date || !start_time){
            logger.warn('Appointment creation rejected: missing required fields', { patient_id: patient_id || null, doctor_id: doctor_id || null, hospital_id: hospital_id || null, date: date || null, start_time: start_time || null });
            return res.status(400).json({success: false, message: 'Provide Full Info'});
        };

        const new_appointment = await Appointment.create({
            patient_id,
            doctor_id,
            hospital_id,
            date,
            start_time,
        });

        logger.info('Appointment record created', { appointmentId: new_appointment.id, patient_id, doctor_id, hospital_id, date, start_time });
        return res.status(201).json({success: true, message: 'Appointment created'})
    } catch (error) {
        logger.error('Error creating appointment record', { error: error.message, stack: error.stack });
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const getRecordById = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            logger.warn('Appointment fetch by id rejected: missing id');
            return res.status(400).json({success: false, message: 'Provide record id'})
        };

        const appointment = await Appointment.findByPk(id);
        if(!appointment){
            logger.warn('Appointment fetch by id failed: invalid id', { id });
            return res.status(404).json({success: false, message: 'Invalid Id'})
        };

        logger.info('Appointment record fetched by id', { appointmentId: appointment.id });
        return res.status(200).json({success: true, message: 'Fetched Record', data: appointment});
    } catch (error) {
        logger.error('Error fetching appointment by id', { appointmentId: req.params.id, error: error.message, stack: error.stack });
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
};

export const getRecordByPatient = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            logger.warn('Appointment fetch by patient rejected: missing id');
            return res.status(400).json({success: false, message: 'Provide Patient Id'})
        };

        const appointments = await Appointment.findAll({where:{patient_id: id}});
        if(!appointments || appointments.length == 0){
            logger.warn('Appointment fetch by patient returned no records', { patientId: id });
            return res.status(404).json({success: false, message: 'No Patient Appointments'});
        };

        logger.info('Appointments fetched by patient', { patientId: id, count: appointments.length });
        return res.status(200).json({success: true, message: 'Fetched records', data: appointments});
    } catch (error) {
        logger.error('Error fetching appointments by patient', { patientId: req.params.id, error: error.message, stack: error.stack });
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const getRecordByDoctor = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            logger.warn('Appointment fetch by doctor rejected: missing id');
            return res.status(400).json({success: false, message: 'Provide Doctor Id'})
        };

        const appointments = await Appointment.findAll({where:{doctor_id: id}});
        if(!appointments || appointments.length == 0){
            logger.warn('Appointment fetch by doctor returned no records', { doctorId: id });
            return res.status(404).json({success: false, message: 'No Appointments Fetched'});
        };

        logger.info('Appointments fetched by doctor', { doctorId: id, count: appointments.length });
        return res.status(200).json({success: true, message: 'Fetched Record', data: appointments})
    } catch (error) {
        logger.error('Error fetching appointments by doctor', { doctorId: req.params.id, error: error.message, stack: error.stack });
        return res.status(500).json({success: false, message: 'internal Server Error'})
    }
};

export const getRecordByHospital = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            logger.warn('Appointment fetch by hospital rejected: missing id');
            return res.status(400).json({success: false, message: 'Provide Hospital Id'})
        };

        const appointments = await Appointment.findAll({where:{hospital_id: id}});
        if(!appointments || appointments.length == 0){
            logger.warn('Appointment fetch by hospital returned no records', { hospitalId: id });
            return res.status(404).json({success: false, message: 'No Appointments Fetched'});
        };

        logger.info('Appointments fetched by hospital', { hospitalId: id, count: appointments.length });
        return res.status(200).json({success: true, message: 'Fetched Record', data: appointments});
    } catch (error) {
        logger.error('Error fetching appointments by hospital', { hospitalId: req.params.id, error: error.message, stack: error.stack });
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const updateRecord = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            logger.warn('Appointment update rejected: missing id');
            return res.status(400).json({success: false, message: 'Provide record id'})
        };

        const {patient_id, doctor_id, hospital_id, date, start_time, status, end_time } = req.body;
        const appointment = await Appointment.findByPk(id);
        if(!appointment){
            logger.warn('Appointment update failed: invalid id', { id });
            return res.status(404).json({success: false, message: 'Invalid Id'})
        };

        const updated_record = await appointment.update({
            patient_id,
            doctor_id,
            hospital_id,
            date,
            start_time,
            status,
            end_time
        });

        logger.info('Appointment record updated', { appointmentId: updated_record.id, status, patient_id, doctor_id, hospital_id, date, start_time });
        return res.status(200).json({success: true, message: 'Record Updated'})
    } catch (error) {
        logger.error('Error updating appointment record', { appointmentId: req.params.id, error: error.message, stack: error.stack });
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
};

export const deleteRecord = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            logger.warn('Appointment delete rejected: missing id');
            return res.status(400).json({success: false, message: 'Provide record id'})
        };

        const appointment = await Appointment.findByPk(id);
        if(!appointment){
            logger.warn('Appointment delete failed: invalid id', { id });
            return res.status(404).json({success: false, message: 'Invalid Id'})
        };

        await appointment.destroy();
        logger.info('Appointment record deleted', { appointmentId: appointment.id });
        return res.status(200).json({success: true, message: 'Record Deleted'})
    } catch (error) {
        logger.error('Error deleting appointment record', { appointmentId: req.params.id, error: error.message, stack: error.stack });
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};