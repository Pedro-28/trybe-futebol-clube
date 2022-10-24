import * as bcrypt from 'bcryptjs';
import Token from '../utils/Token';
import Users from '../database/models/UsersModel';
import ILoginDTO from '../interfaces/LoginInterface';

export default class LoginService {
  static async login({ email, password }: ILoginDTO) {
    const user = await Users.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('');
    }

    if (await !bcrypt.compare(password, user.password)) {
      throw new Error('');
    }

    return Token.tokenGenerate(user);
  }
}
