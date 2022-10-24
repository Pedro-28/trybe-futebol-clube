import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import Users from '../database/models/UsersModel';

const { JWT_SECRET = 'secret' } = process.env;

export default class Token {
  static tokenGenerate({ id, email }: Users): string {
    const jwtConfig: jwt.SignOptions = {
      expiresIn: '1d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ id, email }, JWT_SECRET, jwtConfig);

    return token;
  }
}
