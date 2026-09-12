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
            model: 'users',
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
    }
}, {timestamps: false});

export default Patient;