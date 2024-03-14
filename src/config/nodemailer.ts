import { createTransport } from 'nodemailer';
import SMTPTransport from "nodemailer/lib/smtp-transport";

export const sendEmailVerification = (email: string, token: string) => {

    return new Promise((resolve, reject) => {

        const smtOptions: SMTPTransport.Options ={
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.USER_EMAIL,
                accessToken: process.env.USER_PASS,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN
            }
        };

        const transporter = createTransport(smtOptions);

        const mailOptions = {
            from: email,
            to: email,
            subject: 'Devtalles Sorteos - Verificación de correo electrónico.',
            text: `Haz clic en el siguiente enlace para verificar tu correo electrónico: ${process.env.DOMAIN}/verificar?token=${token}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        });
    });
}