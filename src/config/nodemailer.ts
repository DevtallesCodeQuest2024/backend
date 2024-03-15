import { createTransport } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export const sendEmailVerification = (email: string, token: string) => {
  return new Promise((resolve, reject) => {
    const smtOptions: SMTPTransport.Options = {
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.USER_EMAIL,
        accessToken: process.env.USER_PASS,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
      }
    };

    const transporter = createTransport(smtOptions);

    const mailOptions: Mail.Options = {
      from: email,
      to: email,
      subject: "Devtalles Sorteos - Verificación de correo electrónico.",
      html: `<p>Haz clic en el siguiente <a href="${process.env.DOMAIN}/verificar?token=${token}">enlace</a> para verificar tu correo electrónico y completar tu registro</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};
