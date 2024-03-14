import { sign, verify } from 'jsonwebtoken';
import { Request } from 'express';
import {DecodedType} from "../interface/types/decode.type";

const JWT_SECRET: string = process.env.JWT_SECRET || 's$3Cr37s$';

export class Jwt {

    static async generateToken(payload: Object, duration: string = '1h') {
        return sign(payload, JWT_SECRET, { expiresIn: duration });
    }

    static async validateToken<T>(token: string): Promise<T | null> {
        return new Promise((resolve, reject) => {
            verify( token, JWT_SECRET, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve( decoded as T );
                }
            });
        });
    }

    static getTokenFromHeaders(req: Request): string | null {
        const autorizacion = req.headers.authorization;

        //Si existe el encabezado
        let token;
        let bearer;

        if(autorizacion) {
            token = autorizacion.split(' ')[0]; //Si viene como "Token"
            bearer = autorizacion.split(' ')[0]; //Si viene como "Bearer"
        }

        //Si existe el token
        if(autorizacion && token === 'Token' || autorizacion && bearer === 'Bearer' ){
            return autorizacion.split(' ')[1]; //Retorna el token
        }

        //Si no existe
        return null; //Se retorna valor nulo
    }

    static async getEmailFromToken(req: Request) {
        const token = this.getTokenFromHeaders(req)
        const decoded: DecodedType | null = await Jwt.validateToken(token!);
        return decoded!.email;
    }
}