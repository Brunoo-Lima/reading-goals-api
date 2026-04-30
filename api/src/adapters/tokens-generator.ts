import jwt from 'jsonwebtoken';
import { REFRESH_TOKEN_EXPIRY_MS } from '../utils/auth-session-expiry';

export class TokensGeneratorAdapter {
  execute(userId: string, rememberMe = false) {
    return {
      accessToken: jwt.sign(
        { userId },
        process.env.JWT_ACCESS_TOKEN_SECRET as string,
        { expiresIn: '15m' },
      ),
      refreshToken: jwt.sign(
        { userId },
        process.env.JWT_REFRESH_TOKEN_SECRET as string,
        {
          expiresIn: rememberMe ? REFRESH_TOKEN_EXPIRY_MS / 1000 : '7d',
        },
      ),
    };
  }
}
