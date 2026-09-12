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
router.get('/doctor/hospital', authenticate, authorize('manager'), getRecordByHospital);
router.get('/doctor/:id',authenticate, authorize('manager'), getRecordById);
router.get('/doctor/user/:id', authenticate, authorize('manager'), getRecordByUser);
router.put('/doctor/:id', authenticate, authorize('manager'), updateRecord);
router.delete('/doctor/:id', authenticate, authorize('manager'), deleteRecord);

export default router;