import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {connect_database} from './src/database/connect.js'
import AuthRoutes from './src/auth/routes.js';
import HospitalRoutes from './src/hospital/routes.js';
import DoctorRoutes from './src/Doctors/routes.js';
import UserRoutes from './src/users/routes.js';
import PatientRoutes from './src/patients/routes.js';
import AppointmentRoutes from './src/appointments/routes.js';
import PatientHistoryRoutes from './src/patient-history/routes.js';
import staffRoutes from './src/staff/routes.js';
import PatientService from './src/patient-services/routes.js';
import httpLogger from './src/middleware/logger.js';
dotenv.config();

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors({origin: ['https://care-sync-app.vercel.app']}))
app.use(httpLogger);

app.use('/api', AuthRoutes);
app.use('/api', HospitalRoutes);
app.use('/api', DoctorRoutes);
app.use('/api', UserRoutes);
app.use('/api', PatientRoutes);
app.use('/api', AppointmentRoutes);
app.use('/api', PatientHistoryRoutes);
app.use('/api', staffRoutes);
app.use('/api', PatientService);

app.listen(PORT, () => {
    connect_database();
    console.log("server is Running")
});