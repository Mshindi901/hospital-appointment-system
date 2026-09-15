import express from 'express';
import {
    newpatientHistory,
    getAllPatientHistoryByHospital,
    getPatientHistory,
    getPatientHistoryByStaff,
    updatePatientHistory,
    deletePatientHistory
} from './controller.js';
import {authenticate, authorize} from '../middleware/auth.js';

const router = express.Router();

router.post('/patient-history', authenticate, authorize('manager', 'staff'), newpatientHistory);
router.get('/patient-history/hospital/:id', authenticate, authorize('manager', 'staff', 'doctor'), getAllPatientHistoryByHospital);
router.get('/patient-history/patient/:id', authenticate, authorize('staff', 'manager'), getPatientHistory);
router.get('/patient-history/staff/:id', authenticate, authorize('manager'), getPatientHistoryByStaff);
router.put('/patient-history/:id', authenticate, authorize('staff', 'doctor'), updatePatientHistory);
router.delete('/patient-history/:id', authenticate, authorize('manager', 'staff'), deletePatientHistory);

export default router;