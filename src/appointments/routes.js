import express from 'express';
import {
    newRecord,
    getRecordByDoctor,
    getRecordByHospital,
    getRecordById,
    getRecordByPatient,
    updateRecord,
    deleteRecord
} from './controller.js';

import {authenticate, authorize} from'../middleware/auth.js';

const router = express.Router();

router.post('/appointment', authenticate, authorize('manager', 'doctor'), newRecord);
router.get('/appointment/doctor/:id', authenticate, authorize('manager', 'doctor'), getRecordByDoctor);
router.get('/appointment/hospital/:id', authenticate, authorize('manager'), getRecordByHospital);
router.get('/appointment/patient/:id', authenticate, authorize('manager', 'doctor'), getRecordByPatient);
router.get('/appointment/:id', authenticate, authorize('manager', 'admin'), getRecordById);
router.put('/appointment/:id', authenticate, authorize('manager'), updateRecord);
router.delete('/appointment/:id', authenticate, authorize('manager'), deleteRecord);

export default router;