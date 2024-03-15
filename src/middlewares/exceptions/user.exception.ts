import { NextFunction, Request, Response } from "express";
import { getUserByEmail } from "../../service/user.service";
import { Jwt } from "../../config/jwt";
import {UserModel} from "../../model/user/user.model";

export const userAlreadyExistsException = async function (req: Request, res: Response, next: NextFunction) {

    const email = await Jwt.getEmailFromToken(req);

    const user = await getUserByEmail(email);

    if (user) {
        return res
            .status(400)
            .json({
                error: true,
                code: 400,
                message: ['Ya existe un usuario registrado con ese email.'],
                data: null,
            });
    }

    next();
};

export const emailUserAlreadyExistsException = async function (req: Request, res: Response, next: NextFunction) {

    const { email } = req.body;

    const user = await getUserByEmail( email);

    if (user) {
        return res
            .status(400)
            .json({
                error: true,
                code: 400,
                message: ['Ya existe un usuario registrado con ese email.'],
                data: null,
            });
    }

    next();
}

export const userNotFoundException = async function (req: Request, res: Response, next: NextFunction) {

    const email = await Jwt.getEmailFromToken(req);

    const user = await getUserByEmail(email);

    if (!user) {
        return res
            .status(404)
            .json({
                error: true,
                code: 404,
                message: ['Usuario no encontrado.'],
                data: null
            });
    }

    next();
}

export const userOrPassWrongException = async function (req: Request, res: Response, next: NextFunction) {

    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (!user || !user.validatePassword(password) || !user.isActive) {
        return res
            .status(401)
            .json({
                error: true,
                code: 401,
                message: ['Usuario o contraseña incorrectos'],
                data: null
            });
    }

    next();
}