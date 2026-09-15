import sequelize from '../database/config.js';
import { DataTypes } from 'sequelize';

const Staff = sequelize.define('staffs', {
    id: {
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
    department: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {timestamps: true});

export default Staff;