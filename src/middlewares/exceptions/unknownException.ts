import {NextFunction, Request, Response} from "express";

interface IError {
    statusCode: number;
    message: string;
}

export const unknownException = function (err: IError, req: Request, res: Response, next: NextFunction ) {
    const status = err.statusCode ? err.statusCode : 500;
    const message = 'Hubo un error inesperado en el servidor.'

    res
        .status(status)
        .json({
            error: true,
            code: status,
            message: [message],
        });

};