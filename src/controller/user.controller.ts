import { Request, Response } from "express";

import {
    signup as signupService,
    login as loginService
} from "../service/user.service";

export const signup = (req: Request, res: Response) => {

    const userRegistered = signupService(req.body);

    res
        .status(201)
        .json({
            error: false,
            code: 201,
            message: 'Usuario registrado',
            data: userRegistered
        });
}

export const login = (req: Request, res: Response) => {

    const userLogged = loginService(req.body);

    res
        .status(200)
        .json({
            error: false,
            code: 200,
            message: 'Usuario logueado'
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