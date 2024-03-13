import { NextFunction, Request, Response } from "express";
import { getUserByEmail } from "../../service/user.service";
import { Jwt } from "../../config/jwt";

export const userAlreadyExistsException = async function (req: Request, res: Response, next: NextFunction) {

    const email = await Jwt.getEmailFromToken(req);

    const userExist = await getUserByEmail(email);

    if (userExist) {
        return res
            .status(400)
            .json({
                error: true,
                code: 400,
                message: 'Ya existe un usuario registrado con ese email.',
                data: null,
            });
    }

    next();
};

export const userNotFoundException = async function (req: Request, res: Response, next: NextFunction) {

    const email = await Jwt.getEmailFromToken(req);

    const user = await getUserByEmail(email);

    if (!user) {
        return res
            .status(404)
            .json({
                error: true,
                code: 404,
                message: 'Usuario no encontrado.',
                data: null
            });
    }

    next();
}