import Patient from "./schema.js";

export const newRecord = async(req, res) => {
    try {
        const {hospital_id, name, email, address} = req.body;
        if(!hospital_id || !name || !email){
            return res.status(400).json({success: false, message: 'Provide Full info'})
        };
        const new_record = await Patient.create({hospital_id, name, email, address});
        if(!new_record){
            return res.status(404).json({success: false, message: 'failed to add record'});
        };
        return res.status(201).json({success: true, message: 'Record added'});
    } catch (error) {
        console.error(`Error with creating a new record ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const getRecordById = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide Id'});
        };
        const patient = await Patient.findByPk(id);
        if(!patient){
            return res.status(404).json({success: false, message: 'Invalid Id'});
        };
        return res.status(200).json({success: true, message: 'Record Fetched', data: patient})
    } catch (error) {
        console.error(`Error with getting a record by Id ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
};

export const getRecordByHospitals = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide Id'});
        };
        const patients = await Patient.findAll({where: {hospital_id: id}});
        if(!patients || patients.length == 0){
            return res.status(404).json({success: false, message: 'No Patients Fetched'})
        };
        return res.status(200).json({success: true, message: 'Record Fetched', data: patients})
    } catch (error) {
        console.error(`Error with getting record by hospital ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const updateRecord = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide Id'});
        };
        const {hospital_id, name, email, address} = req.body;
        const patient = await Patient.findByPk(id);
        if(!patient){
            return res.status(404).json({success: false, message: 'Invalid Id'});
        };
        const updated_record = await patient.update({hospital_id, name, email, address});
        if(!updated_record){
            return res.status(404).json({success: false, message: 'Failed to update'})
        };
        return res.status(200).json({success: true, message: 'Record updated'})
    } catch (error) {
        console.error(`Error with updating the record ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const deleteRecord = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide Id'});
        };
        const patient = await Patient.findByPk(id);
        if(!patient){
            return res.status(404).json({success: false, message: 'Invalid Id'});
        };
        await patient.destroy();
        return res.status(200).json({success: true, message: 'Record Deleted'})
    } catch (error) {
        console.error(`Error with deleting record ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};