import * as bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';

import Token from '../utils/Token';
import Users from '../database/models/UsersModel';
import { ILoginDTO } from '../interfaces/LoginInterface';
import CustomError from '../utils/CustomError';

export default class LoginService {
  private model = Users;

  public async login({ email, password }: ILoginDTO) {
    const user = await this.model.findOne({
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

  public async getRole(id: number) {
    const user = await this.model.findByPk(id);

    if (!user) {
      throw new CustomError(StatusCodes.FAILED_DEPENDENCY, 'Unknown user');
    }

    return user.role;
  }
}
