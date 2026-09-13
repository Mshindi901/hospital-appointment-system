import express from 'express';
import {
    newRecord,
    getRecordByHospitals,
    getRecordById,
    updateRecord,
    deleteRecord
} from './controller.js';
import {authenticate, authorize} from '../middleware/auth.js';

const router = express.Router();

router.post('/patient', authenticate, authorize('manager'), newRecord);
router.get('/patient/hospitals/:id', authenticate, authorize('manager', 'admin'), getRecordByHospitals);
router.get('/patient/:id', authenticate, authorize('manager', 'admin'), getRecordById);
router.put('/patient/:id',authenticate, authorize('manager'), updateRecord);
router.delete('/patient/:id', authenticate, authorize('manager'), deleteRecord);

export default router;