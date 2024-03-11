import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import {initDatabase} from './database/db';

const app = express();

//Inicializar la base de datos
initDatabase();

app.use(express.json());//Parsea el body
app.use(express.urlencoded({ extended: false})); //Parsea URL codificados del body
app.use(cors()); //Seguridad en peticiones

app.use('/api/v1', require('./router/index'));

const PORT = process.env.SERVER_PORT || 4006;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});