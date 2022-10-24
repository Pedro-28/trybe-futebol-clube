import * as bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';

import Token from '../utils/Token';
import Users from '../database/models/UsersModel';
import ILoginDTO from '../interfaces/LoginInterface';
import CustomError from '../utils/CustomError';

export default class LoginService {
  static async login({ email, password }: ILoginDTO) {
    const user = await Users.findOne({
      where: { email },
    });

    if (!user) {
      throw new CustomError(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new CustomError(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }

    return Token.tokenGenerate(user);
  }
}
