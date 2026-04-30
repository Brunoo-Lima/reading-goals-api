import jwt from 'jsonwebtoken';
import { REFRESH_TOKEN_EXPIRY_MS } from '../utils/auth-session-expiry';

export class TokensGeneratorAdapter {
  execute(userId: string) {
    return {
      accessToken: jwt.sign({ userId }, process.env.JWT_SECRET as string, {
        expiresIn: '15m',
      }),
      refreshToken: jwt.sign({ userId }, process.env.JWT_SECRET as string, {
        expiresIn: Math.floor(REFRESH_TOKEN_EXPIRY_MS / 1000),
      }),
    };
  }
}
