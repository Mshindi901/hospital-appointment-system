import express from 'express';
import {
    newServiceRecord,
    getServicesByDoctor,
    getServicesByHistory,
    deleteServices
} from './controller.js';
import {authenticate, authorize} from '../middleware/auth.js'

const router = express.Router();

router.post('/services', authenticate, authorize('doctor'), newServiceRecord);
router.get('/services/patient-history/:id', authenticate, authorize('manager', 'staff', 'doctor'), getServicesByHistory);
router.get('/services/doctor/:id', authenticate, authorize('doctor'), getServicesByDoctor);
router.delete('/services/:id', authenticate, authorize('staff', 'doctor'), deleteServices);

export default router;