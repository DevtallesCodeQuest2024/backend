import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { initDatabase } from './database/db';

const app = express();

//Inicializar la base de datos
initDatabase();

app.use(express.json());//Parsea el body
app.use(express.urlencoded({ extended: false})); //Parsea URL codificados del body
app.use(cors()); //Seguridad en peticiones

app.use('/api/v1', require('./router/index'));

import { handleErrorJoi } from "./middlewares/joi-validation-error";
app.use( handleErrorJoi );

import { unknownError } from "./middlewares/exceptions/general.exception";
app.use( unknownError );


const PORT = process.env.PORT || 4006;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});