import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

export const connect = async () => {

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

/**
 * User.sync() - This creates the table if it doesn't exist (and does nothing if it already exists)
 * User.sync({ force: true }) - This creates the table, dropping it first if it already existed
 * User.sync({ alter: true }) - This checks what is the current state of the table in the database
 * (which columns it has, what are their data types, etc), and then performs the necessary changes
 * in the table to make it match the model.
 * */
export const sync = async () => {
    try {
        await sequelize.sync({force:true});
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to synchronize the models:', error);
    }
}