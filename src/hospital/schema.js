import sequelize from "../database/config.js";
import { DataTypes } from "sequelize";

const Hospital = sequelize.define('hospitals', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contacts: {
        type: DataTypes.STRING,
        allowNull: true
    }, 
    location: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {timestamps: true});

export default Hospital;