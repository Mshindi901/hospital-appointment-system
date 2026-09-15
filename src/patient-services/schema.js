import sequelize from '../database/config.js';
import {DataTypes, UUIDV4} from 'sequelize';

const PatientServices = sequelize.define('patient_services', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    history_id: {
        type: DataTypes.UUID,
        references: {
            model: 'patient_histories',
            key: 'id'
        },
        allowNull: false
    },
    doctor_id: {
        type: DataTypes.UUID,
        references: {
            model: 'doctors',
            key: 'id'
        },
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    service_provided: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {timestamps: true});

export default PatientServices