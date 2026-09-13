import Hospital from "./schema.js";

export const newRecord = async(req, res) => {
    try {
        const {name, contacts, location} = req.body;
        if(!name || !location){
            return res.status(400).json({success: false, message: 'Provide Full info'})
        };
        const new_record = await Hospital.create({name, contacts, location});
        if(!new_record){
            return res.status(404).json({success: false, message: 'Failed to create new Record'});
        };
        return res.status(201).json({success: true, message: 'hospital record added'})
    } catch (error) {
        console.error(`Error occured when creating new record ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
};

export const getRecordById = async(req, res) => {
    try {
        const {id} =req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide Id'})
        };
        const hospital = await Hospital.findByPk(id);
        if(!hospital){
            return res.status(404).json({success: false, message: 'no Hospital fetched'})
        };
        return res.status(200).json({success: true, message: 'Fetched hospital', data: hospital })
    } catch (error) {
        console.error(`Error with getting a record by id ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
};

export const getRecordByName = async(req, res) => {
    try {
        const name = req.query?.name || req.body?.name;

        if(!name){
            const hospitals = await Hospital.findAll();
            return res.status(200).json({success: true, message: 'Hospitals fetched', data: hospitals || []});
        };

        const hospital = await Hospital.findOne({where:{name}});
        if(!hospital){
            return res.status(404).json({success: false, message: 'failed to fetch'})
        };
        return res.status(200).json({success: true, message: 'hospital fetched', data: hospital})
    } catch (error) {
        console.error(`Error with getting record by its name ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const updateRecord = async(req, res) => {
    try {
        const {id} =req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide Id'})
        };
        const {user_id, name, contacts, location} = req.body;
        if(!user_id ||!name || !location){
            return res.status(400).json({success: false, message: 'Provide Full info'})
        };
        const hospital = await Hospital.findByPk(id);
        if(!hospital){
            return res.status(404).json({success: false, message: 'no Hospital fetched'})
        };
        const updated_hospital = await hospital.update({user_id, name, contacts, location});
        return res.status(200).json({success: true, message: 'Updated record'})
    } catch (error) {
        console.error(`Error with updating record by id ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
};

export const deleteRecord = async(req, res) => {
    try {
        const {id} =req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide Id'})
        };
        const hospital = await Hospital.findByPk(id);
        if(!hospital){
            return res.status(404).json({success: false, message: 'no Hospital fetched'})
        };
        await hospital.destroy();
        return res.status(200).json({success: true, message: 'deleted record'})
    } catch (error) {
        console.error(`Error with deleting record by Id ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
};