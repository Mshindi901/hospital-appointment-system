import express from 'express';
import  {
    newRecord,
    getRecordById,
    getRecordByName,
    updateRecord,
    deleteRecord
} from './controller.js';
import {authenticate, authorize} from '../middleware/auth.js';

const router = express.Router();

router.post('/hospital', authenticate, authorize('admin'), newRecord);
router.get('/hospital', authenticate, authorize('admin'), getRecordByName);
router.get('/hospital/:id', authenticate, authorize('manager', 'admin'), getRecordById);
router.put('/hospital/:id', authenticate, authorize('admin'),updateRecord);
router.delete('/hospital/:id', authenticate, authorize('admin'), deleteRecord);

export default router;