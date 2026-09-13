import sequelize from "../database/config.js";
import { DataTypes } from "sequelize";

const Appointment = sequelize.define('appointments', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    patient_id: {
        type: DataTypes.UUID,
        references: {
            model: 'patients',
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
    hospital_id: {
        type: DataTypes.UUID,
        references: {
            model: 'hospitals',
            key: 'id'
        },
        allowNull: false
    },
    date :{
        type: DataTypes.DATE,
        allowNull: false
    },
    start_time: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active',
        allowNull: false
    },
},{timestamps: true, indexes: [{name: 'unique_appointment',unique: true, fields: ['doctor_id', 'start_time']}]});

export default Appointment;