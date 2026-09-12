import Doctor from "./schema.js";

export const newRecord = async(req, res) => {
    try {
        const {user_id, hospital_id, type, available_days} = req.body;
        if(!user_id || !hospital_id || !type || !available_days){
            return res.status(400).json({success: false, message: 'Provide all info'})
        };
        const new_record = await Doctor.create({user_id, hospital_id, type, available_days});
        if(!new_record){
            return res.status(404).json({success: false, message: 'failed to add record'})
        };
        return res.status(201).json({success: true, message: 'record added'})
    } catch (error) {
        console.error(`Error with creating new record ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const getRecordById = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide Record Id'})
        };
        const doctor = await Doctor.findByPk(id);
        if(!doctor){
            return res.status(404).json({success: false, message: 'Invalid Id'})
        };
        return res.status(200).json({success: true, message: 'Fetched Record', data: doctor});
    } catch (error) {
        console.error(`Error with getting a record by Id ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const getRecordByUser = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide Record Id'})
        };
        const doctors = await Doctor.findAll({where: {user_id: id}});
        if(!doctors || doctors.length == 0){
            return res.status(404).json({success: false, message: 'No records fetched'})
        };
        return res.status(200).json({success: true, message: 'fetched record', data: doctors})
    } catch (error) {
        console.error(`Error with getting the record by user ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const getRecordByHospital = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide Record Id'})
        };
        const doctors = await Doctor.findAll({where:{hospital_id: id}});
        if(!doctors || doctors.length == 0){
            return res.status(404).json({success: false, message: 'No records fetched'})
        };
        return res.status(200).json({success: true, message: 'fetched record', data: doctors});
    } catch (error) {
        console.error(`Error with getting record by Hospital ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
};

export const updateRecord = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide Record Id'})
        };
        const {user_id, hospital_id, type, available_days} = req.body;
        const doctor = await Doctor.findByPk(id);
        if(!doctor){
            return res.status(404).json({success: false, message: 'Invalid Id'})
        };
        const updated_record = await doctor.update({user_id, hospital_id, type, available_days});
        return res.status(200).json({success: true, message: 'record updated'})
    } catch (error) {
        console.error(`Error with updating the record ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const deleteRecord = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide Record Id'})
        };
        const doctor = await Doctor.findByPk(id);
        if(!doctor){
            return res.status(404).json({success: false, message: 'Invalid Id'})
        };
        await doctor.destroy();
        return res.status(200).json({success: true, message: 'Record deleted'})
    } catch (error) {
        console.error(`Error with deleting the record ${error}`);
        return res.status(500).json({success: false, message: 'Internal server Error'})
    }
};