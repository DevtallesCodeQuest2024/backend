import { NextFunction, Request, Response } from "express";
import { getUserByEmail } from "../../service/user.service";
import { Jwt } from "../../config/jwt";

export const authorizedRoleException = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const email = await Jwt.getEmailFromToken(req);

  const user = await getUserByEmail(email);

  if (!user) {
    return next({
      statusCode: 404,
      message: "Usuario no encontrado"
    });
  }

  if (user.role !== "admin") {
    return next({
      statusCode: 401,
      message: "Usuario no autorizado para realizar esta accion"
    });
  }

  next();
};
