import sequelize from "../database/config.js";
import { DataTypes, UUID } from "sequelize";

const Doctor = sequelize.define('doctors', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.UUID,
        references: {
            model: 'users',
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
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    available_days: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    }
}, {timestamps: true});

export default Doctor;