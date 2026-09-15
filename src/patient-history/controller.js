import PatientHistory from "./schema.js";

export const newpatientHistory = async(req, res) => {
    try {
        const {patient_id, hospital_id, date, served_by, status} = req.body;
        if(!patient_id || !hospital_id || !date || !served_by || !status){
            return res.status(400).json({success: false, message: 'Provide All Info'});
        };
        const new_record = await PatientHistory.create({patient_id, hospital_id, date, served_by});
        if(!new_record){
            return res.status(404).json({success: false, message: 'Failed to create'})
        };
        return res.status(201).json({success: true, message: 'Record added'})
    } catch (error) {
        console.error(`Error with creating new patient history record ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const getPatientHistory = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide the Patient Id'});
        };
        const patient_history = await PatientHistory.findAll({where:{patient_id: id}});
        if(!patient_history || patient_history.length == 0){
            return res.status(404).json({success: false, message: 'No Record Fetched'})
        };
        return res.status(200).json({success: true, message: 'Records Fetched', data: patient_history})
    } catch (error) {
        console.error(`Error with getting a patient history ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const getPatientHistoryByStaff = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide Staff ID'})
        };
        const records = await PatientHistory.findAll({where:{served_by: id}});
        if(!records || records.length == 0){
            return res.status(404).json({success: false, message: 'No records Fetched'})
        };
        return res.status(200).json({success: true, message: 'Records Fetched', data: records})
    } catch (error) {
        console.error(`Error with getting patient history records by staff ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const getAllPatientHistoryByHospital = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message:  'Provide Hospital Id'})
        };
        const records = await PatientHistory.findAll({where:{hospital_id: id}});
        if(!records || records.length == 0){
            return res.status(404).json({success: false, message: 'No records Fetched'});
        };
        return res.status(200).json({success: true, message: 'Records Fetched', data: records})
    } catch (error) {
        console.error(`Error with getting all patient history records by hospital ${error}`);
        return res.status(500).json({success: false, message : 'Internal Server Error'});
    }
};

export const updatePatientHistory = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide Record ID'})
        };
        const {patient_id, hospital_id, date, served_by, status} = req.body;
        const record = await PatientHistory.findByPk(id);
        if(!record){
            return res.status(404).json({success: false, message: 'Invalid Id'})
        };
        const updated_record = await record.update({patient_id, hospital_id, date, served_by, status});
        if(!updated_record){
            return res.status(404).json({success: false, message: 'Update Failed'})
        }
        return res.status(200).json({success: true, message: 'Record Updated'})
    } catch (error) {
        console.error(`Error with updating Patient History record ${error}`);
        return res.status(500).json({success: false, message:'Internal Server Error'});
    }
};

export const deletePatientHistory = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide Record ID'})
        };
        const record = await PatientHistory.findByPk(id);
        if(!record){
            return res.status(404).json({success: false, message: 'Invalid Id'})
        };
        await record.destroy();
        return res.status(200).json({success: true, message: 'Record deleted'})
    } catch (error) {
        console.error(`Error with deleting record ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};
