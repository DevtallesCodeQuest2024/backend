import { Jwt } from "../config/jwt";
import { sendEmailVerification } from "../config/nodemailer";

export const sendEmail = async ( email: string ): Promise<boolean> => {

    const token = await Jwt.generateToken({ email }, '900s'); // 15 minutes

    try {
        await sendEmailVerification(email, token);
        return true;
    } catch (error) {
        return false;
    }
}