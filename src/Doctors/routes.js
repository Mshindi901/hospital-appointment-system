import express from 'express';
import {
    newRecord,
    getRecordByHospital,
    getRecordById,
    getRecordByUser,
    updateRecord,
    deleteRecord
} from './controller.js';
import {authenticate, authorize} from '../middleware/auth.js'

const router = express.Router();

router.post('/doctor', authenticate, authorize('manager'), newRecord);
router.get('/doctor/hospital/:id', authenticate, authorize('manager', 'admin'), getRecordByHospital);
router.get('/doctor/:id',authenticate, authorize('manager', 'admin'), getRecordById);
router.get('/doctor/user/:id', authenticate, authorize('manager', 'doctor', 'admin'), getRecordByUser);
router.put('/doctor/:id', authenticate, authorize('manager'), updateRecord);
router.delete('/doctor/:id', authenticate, authorize('manager'), deleteRecord);

export default router;