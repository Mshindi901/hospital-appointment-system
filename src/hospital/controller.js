import Hospital from "./schema.js";

export const newRecord = async(req, res) => {
    try {
        const {user_id, name, contacts, location} = req.body;
        if(!user_id ||!name || !location){
            return res.staus(400).json({success: false, message: 'Provide Full info'})
        };
        const new_record = await Hospital.create({user_id, name, contacts, location});
        if(!new_record){
            return res.staus(404).json({success: false, message: 'Failed to create new Record'});
        };
        return res.staus(201).json({success: true, message: 'hospital record added'})
    } catch (error) {
        console.error(`Error occured when creating new record ${error}`);
        return res.staus(500).json({success: false, message: 'Internal Server Error'})
    }
};

export const getRecordById = async(req, res) => {
    try {
        const {id} =req.params;
        if(!id){
            return res.staus(400).json({success: false, message: 'Provide Id'})
        };
        const hospital = await Hospital.findByPk(id);
        if(!hospital){
            return res.staus(404).json({success: false, message: 'no Hospital fetched'})
        };
        return res.staus(200).json({success: true, message: 'Fetched hospital', data: hospital })
    } catch (error) {
        console.error(`Error with getting a record by id ${error}`);
        return res.staus(500).json({success: false, message: 'Internal Server Error'})
    }
};

export const getRecordByName = async(req, res) => {
    try {
        const {name} = req.body;
        if(!name){
            return res.staus(400).json({success: false, message: 'Provide hospital name'})
        };
        const hospital = await Hospital.findOne({where:{name: name}});
        if(!hospital){
            return res.staus(404).json({success: false, message: 'failed to fetch'})
        };
        return res.staus(200).json({success: true, message: 'hospital fetched', data: hospital})
    } catch (error) {
        console.error(`Error with getting record by its name ${error}`);
        return res.staus(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const updateRecord = async(req, res) => {
    try {
        const {id} =req.params;
        if(!id){
            return res.staus(400).json({success: false, message: 'Provide Id'})
        };
        const {user_id, name, contacts, location} = req.body;
        if(!user_id ||!name || !location){
            return res.staus(400).json({success: false, message: 'Provide Full info'})
        };
        const hospital = await Hospital.findByPk(id);
        if(!hospital){
            return res.staus(404).json({success: false, message: 'no Hospital fetched'})
        };
        const updated_hospital = await hospital.update({user_id, name, contacts, location});
        return res.staus(200).json({success: true, message: 'Updated record'})
    } catch (error) {
        console.error(`Error with updating record by id ${error}`);
        return res.staus(500).json({success: false, message: 'Internal Server Error'})
    }
};

export const deleteRecord = async(req, res) => {
    try {
        const {id} =req.params;
        if(!id){
            return res.staus(400).json({success: false, message: 'Provide Id'})
        };
        const hospital = await Hospital.findByPk(id);
        if(!hospital){
            return res.staus(404).json({success: false, message: 'no Hospital fetched'})
        };
        await hospital.destroy();
        return res.staus(200).json({success: true, message: 'deleted record'})
    } catch (error) {
        console.error(`Error with deleting record by Id ${error}`);
        return res.staus(500).json({success: false, message: 'Internal Server Error'})
    }
};