import { Request, Response } from "express";

import {
    signup as signupService,
} from "../service/user.service";

export const signup = async (req: Request, res: Response) => {

    const userRegistered = await signupService(req.body, req);

    res
        .status(201)
        .json({
            error: false,
            code: 201,
            message: 'Usuario registrado con éxito',
            data: userRegistered.publicData()
        });
}

export const findAll = (req: Request, res: Response) => {
    res
        .status(200)
        .json({
            error: false,
            code: 200,
            message: 'Obteniendo usuarios'
        });
}