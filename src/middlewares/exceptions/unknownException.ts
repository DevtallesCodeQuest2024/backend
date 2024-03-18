import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";

interface IError {
  statusCode: number;
  message: string;
  discordUsername?: string;
}

export const unknownException = function (
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.statusCode ? err.statusCode : 500;
  const message = `Hubo un error inesperado en el servidor. ${err.message}`;

  if (err.message === "El usuario no es miembro de la comunidad de devtalles") {
    const discordUsername = err.discordUsername;
    const token = sign({ discordUsername }, "secretoerror", {
      expiresIn: "60s"
    });

    process.env.PATH_WEB
    res.redirect(`${process.env.PATH_WEB}/discord?error=${token}`);
  }

  res.status(status).json({
    error: true,
    code: status,
    message: [message]
  });
};
