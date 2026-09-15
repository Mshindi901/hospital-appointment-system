import PatientServices from "./schema.js";

export const newServiceRecord = async (req, res) => {
    try {
        const {history_id, doctor_id, date, service_provided} = req.body;
        if(!history_id || !doctor_id || !date || !service_provided){
            return res.status(400).json({success: false, message: 'Internal Server Error'})
        };
        const new_service_record = await PatientServices.create({history_id, doctor_id, date, service_provided});
        return res.status(201).json({success: true, message: 'Record added'})
    } catch (error) {
        console.error(`Error with new service record ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
};

export const getServicesByHistory = async (req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide history Id'});
        };
        const record = await PatientServices.findOne({where:{history_id: id}});
        if(!record){
            return res.status(404).json({success: false, message: 'No record Fetched'});
        };
        return res.status(200).json({success: true, message: 'Record Fetched', data: record})
    } catch (error) {
        console.error(`Error with getting service by history Id ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const getServicesByDoctor = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide Doctor ID'})
        };
        const service_history = await PatientServices.findAll({where:{doctor_id: id}});
        if(!service_history || service_history.length == 0){
            return res.status(404).json({success: false, message: 'No record Fetched'})
        };
        return res.status(200).json({success: false, message: 'Records Fetched', data: service_history})
    } catch (error) {
        console.error(`Error with getting services by doctor Id ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
};

export const deleteServices = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide Record ID'})
        };
        const record = await PatientServices.findByPk(id);
        await record.destroy();
        return res.status(200).json({success: true, message: 'Record Deleted'})
    } catch (error) {
        console.error(`Error with deletig the services history ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};