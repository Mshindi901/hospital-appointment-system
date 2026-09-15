import sequelize from '../database/config.js';
import { DataTypes } from 'sequelize';


const PatientHistory = sequelize.define('patient_histories', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    patient_id: {
        type: DataTypes.UUID,
        references: {
            model: 'patients',
            key:'id'
        },
        allowNull: false
    },
    hospital_id: {
        type: DataTypes.UUID,
        references: {
            model: 'hospitals',
            key: 'id'
        },
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    served_by: {
        type: DataTypes.UUID,
        references: {
            model: 'staffs',
            key: 'id'
        },
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('open', 'closed'),
        defaultValue: 'open',
        allowNull: false
    }
}, {timestamps: true});

export default PatientHistory;