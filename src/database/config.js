import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize('postgresql://caresync_app_db_user:CUOCL2SX9Q1HGobulr21lEUIwbBXIdh6@dpg-daj7thek1f9s73ck14hg-a/caresync_app_db', {
    host: 'localhost',
    dialect: 'postgres',
});

export default sequelize;