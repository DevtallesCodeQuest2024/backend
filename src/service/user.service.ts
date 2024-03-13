import { Request } from "express";
import {IUserRegister, UserModelAttributes} from "../interface/user/user-register.interface";
import { UserModel } from "../model/user/user.model";
import { Jwt } from "../config/jwt";
import {Role} from "../model/user/role.enum";

export const signup = async (body: IUserRegister, req: Request) => {

    const { password } = body;

    const email = await Jwt.getEmailFromToken(req);

    const userModel = UserModel.build({
        email: email,
        role: Role.ADMIN,
        isActive: true,
    });

    userModel.createPassword(password);

    return await UserModel.create(
        {
            firstName: '',
            lastName: '',
            email: userModel.email,
            hash: userModel.hash,
            salt: userModel.salt,
            role: userModel.role,
            isActive: userModel.isActive
        }
    );
}

export const getUserByEmail = function (email: string) {
    return UserModel.findOne({
        where: {
            email: email,
            isActive: true
        }
    });
};