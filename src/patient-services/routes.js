import express from 'express';
import {
    newServiceRecord,
    getServicesByDoctor,
    getServicesByHistory,
    deleteServices
} from './controller.js';

const router = express.Router();

router.post('/services', newServiceRecord);
router.get('/services/patient-history/:id', getServicesByHistory);
router.get('/services/doctor/:id', getServicesByDoctor);
router.delete('/services/:id', deleteServices);

export default router;