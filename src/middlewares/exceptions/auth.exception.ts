import { Request, Response, NextFunction } from "express";
import { Jwt } from "../../config/jwt";

export const emailDomainIsNotValidException = async function (req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    const emailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;

    const userExist = emailRegex.test(email);

    if (!userExist) {
        return res.status(400).json({
            error: true,
            code: 400,
            message: 'Correo electrónico inválido'
        });
    }

    next();
};

export const tokenNotFoundException = async function (req: Request, res: Response, next: NextFunction) {

    const token = Jwt.getTokenFromHeaders(req);

    if (!token) {
        return res.status(400).json({
            error: true,
            code: 400,
            message: 'Token no proporcionado'
        });
    }

    next();
};

export const tokenNotValidException = async function (req: Request, res: Response, next: NextFunction) {

    const token = Jwt.getTokenFromHeaders(req);

    type ErrorData = {
        name: string,
        message: string,
        expiredAt: string
    }

    try {

        await Jwt.validateToken<{ email: string }>(token!);

    } catch (error: unknown) {

        const errorData = error as ErrorData;
        const message = errorData.name === 'TokenExpiredError' ?
            `Token expirado. (${errorData.message})`     : 'JsonWebTokenError' ?
                `Token invalido. (${errorData.message})` : `Token aun no esta activo. (${errorData.message})`;

        return res.status(401).json({error: true, statusCode: 401, message });
    }

    next();
};