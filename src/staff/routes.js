import express from 'express';
import {
    newStaffRecord,
    getStaffByHospital,
    getStaffById,
    getStaffByUser,
    updateStaff,
    deleteStaff
} from './controller.js';
import {authenticate, authorize} from '../middleware/auth.js'

const router = express.Router();

router.post('/staff', authenticate, authorize('manager'), newStaffRecord);

router.get('/staff/hospital/:id',  authenticate, authorize('manager'), getStaffByHospital);
router.get('/staff/user/:id',  authenticate, authorize('manager'), getStaffByUser);
router.get('/staff/:id', authenticate, authorize('manager', 'staff'), getStaffById);

router.put('/staff/:id', authenticate, authorize('manager'), updateStaff);

router.delete('/staff/:id',  authenticate, authorize('manager'), deleteStaff);

export default router;