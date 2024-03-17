import { Request, Response } from 'express';
import { sendEmail } from '../service/auth.service';
import { validateDiscordUser } from '../service/discord.service';
import { Jwt } from '../config/jwt';

export const receiveEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  const emailSent = await sendEmail(email);

  const message: string = emailSent
    ? 'Correo electrónico enviado con éxito'
    : 'Error al enviar el correo electrónico de validación';

  if (!emailSent)
    return res.status(500).send({ error: true, code: 500, message: [message] });

  res.status(200).send({
    error: false,
    code: 200,
    message: message,
  });
};

export const verifyToken = async (req: Request, res: Response) => {
  const email = await Jwt.getEmailFromToken(req);

  res.status(200).send({
    error: false,
    code: 200,
    message: 'Token verificado con éxito.',
    data: {
      email,
    },
  });
};

export const discordAuth = async (req: Request, res: Response) => {
    
    const {user, isPartOfGuild} = await validateDiscordUser(req);
    

    if (!isPartOfGuild) {
        return res.status(403).send({
            error: true,
            code: 403,
            message: 'El usuario no es miembro del servidor de Discord.'
        });
    }
   

    res.status(200).send({
        error: false,
        code: 200,
        message: 'Autenticación de Discord realizada con éxito.',
        data: {
            user
        }
        
      });
    // res.redirect('http://localhost:4200/sorteos');
};
