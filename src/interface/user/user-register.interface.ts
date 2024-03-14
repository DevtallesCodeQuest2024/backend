import { Role } from "../../model/user/role.enum";

export interface IUserRegister {
    password: string;
}

export interface UserModelAttributes {
    firstName: string;
    lastName: string;
    email: string;
    hash: string;
    salt: string;
    role: Role;
    isActive: boolean;
}

export interface IUserLogin {
    email: string;
    hash: string;
    salt: string;
    role: Role;
    isActive: boolean;
}
