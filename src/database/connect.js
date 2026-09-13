import sequelize from "./config.js";

export const connect_database = async() => {
    try {
        await sequelize.authenticate();
        console.log('Database Connected successfully');
        await sequelize.sync({alter: true});
        console.log('Models Synced');
    } catch (error) {
        console.error(`Error with connecting to database ${error}`);
        return null;
    }
};