import express from 'express';
import {
    getAllRecords,
    getRecordById,
    getRecordsByHospital,
    updatePassword,
    updateRecord,
    deleteRecord
} from './controller.js';
import {authenticate, authorize} from '../middleware/auth.js';

const router = express.Router();

router.get('/user', authenticate, authorize('admin'), getAllRecords);
router.get('/user/:id', authenticate, getRecordById);
router.get('/user/hospital/:id', authenticate, authorize('manager', 'admin'), getRecordsByHospital);
router.put('/user/password/:id',authenticate, authorize('manager', 'admin'), updatePassword);
router.put('/user/:id', authenticate, authorize('manager', 'admin'), updateRecord);
router.delete('/user/:id', authenticate, authorize('manager', 'admin'), deleteRecord);

export default router;