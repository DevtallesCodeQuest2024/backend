import { Request, Response } from "express";
import { sendEmail } from "../service/auth.service";

export const receiveEmail = async (req: Request, res: Response) => {

    const { email } = req.body;

    const emailSent = await sendEmail(email);

    const message = emailSent ? 'Correo electrónico enviado con éxito' : 'Error al enviar el correo electrónico de validación';
    const code = emailSent ? 200 : 500;

    res.status(code).send({
        error: !emailSent,
        code,
        message
    });

}

export const verifyToken = async (req: Request, res: Response) => {

    res.status(200).send({
        error: false,
        code: 200,
        message: 'Token verificado con éxito.'
    });

}