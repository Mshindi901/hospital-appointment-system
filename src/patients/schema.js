import sequelize from "../database/config.js";
import { DataTypes, UUIDV4 } from "sequelize";

const Patient = sequelize.define('patients', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    hospital_id: {
        type: DataTypes.UUID,
        references: {
            model: 'hospitals',
            key: 'id'
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        },
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    gender: {
        type: DataTypes.ENUM('m', 'f'),
        allowNull: true
    },
    dob: {
        type: DataTypes.DATE,
        allowNull: true
    },
    allergies: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    },
    blood_type: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {timestamps: false});

export default Patient;