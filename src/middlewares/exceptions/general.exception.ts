import { Request, Response } from "express";

interface IError {
    status: number;
    message: string;
}

export const unknownError = function (err: IError, request: Request, response: Response ) {

    const status = err.status || 500;
    const message = err.message || 'Hubo un error inesperado en el servidor.';

    response.status(status).json({
        error: true,
        code: status,
        message: message,
        data: err
    });
};