import Appointment from "./schema.js";

export const newRecord = async(req, res) => {
    try {
        const {patient_id, doctor_id, hospital_id, date, start_time} = req.body;
        if(!patient_id || !doctor_id || !hospital_id || !date || !start_time){
            return res.status(400).json({success: false, message: 'Provide Full Info'})
        };
        const new_appointment = await Appointment.create({
            patient_id,
            doctor_id,
            hospital_id,
            date,
            start_time,
        });
        return res.status(201).json({success: true, message: 'Appointment created'})
    } catch (error) {
        console.error(`Error with creating a new record ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const getRecordById = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide record id'})
        };
        const appointment = await Appointment.findByPk(id);
        if(!appointment){
            return res.status(404).json({success: false, message: 'Invalid Id'})
        };
        return res.status(200).json({success: true, message: 'Fetched Record', data: appointment});
    } catch (error) {
        console.error(`Error with getting a record by Id ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
};

export const getRecordByPatient = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide Patient Id'})
        };
        const appointments = await Appointment.findAll({where:{patient_id: id}});
        if(!appointments || appointments.length == 0){
            return res.status(404).json({success: false, message: 'No Patient Appointments'});
        };
        return res.status(200).json({success: true, message: 'Fetched records', data: appointments});
    } catch (error) {
        console.error(`Error with getting record by patient ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const getRecordByDoctor = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide Doctor Id'})
        };
        const appointments = await Appointment.findAll({where:{doctor_id: id}});
        if(!appointments || appointments.length == 0){
            return res.status(404).json({success: false, message: 'No Appointments Fetched'});
        };
        return res.status(200).json({success: true, message: 'Fetched Record', data: appointments   })
    } catch (error) {
        console.error(`Error with getting record by doctor ${error}`);
        return res.status(500).json({success: false, message: 'internal Server Error'})
    }
};

export const getRecordByHospital = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide Hospital Id'})
        };
        const appointments = await Appointment.findAll({where:{hospital_id: id}});
        if(!appointments || appointments.length == 0){
            return res.status(404).json({success: false, message: 'No Appointments Fetched'});
        };
        return res.status(200).json({success: true, message: 'Fetched Record', data: appointments});
    } catch (error) {
        console.error(`Error with getting appointments by Hospital ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const updateRecord = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide record id'})
        };
        const {patient_id, doctor_id, hospital_id, date, start_time, end_time } = req.body;
        const appointment = await Appointment.findByPk(id);
        if(!appointment){
            return res.status(404).json({success: false, message: 'Invalid Id'})
        };
        const updated_record = await appointment.update({
            patient_id,
            doctor_id,
            hospital_id,
            date,
            start_time,
            end_time
        });
        return res.status(200).json({success: true, message: 'Record Updated'})
    } catch (error) {
        console.error(`Error with update record ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
};

export const deleteRecord = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide record id'})
        };
        const appointment = await Appointment.findByPk(id);
        if(!appointment){
            return res.status(404).json({success: false, message: 'Invalid Id'})
        };
        await appointment.destroy();
        return res.status(200).json({success: true, message: 'Record Deleted'})
    } catch (error) {
        console.error(`Error with deleting the record ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};