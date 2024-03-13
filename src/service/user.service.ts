import {
  IUserLogin,
  IUserRegister,
} from '../interface/user/user-register.interface';

export const signup = (body: IUserRegister) => {
  return body;
};

export const login = async (body: IUserLogin) => {
  return body;
};
