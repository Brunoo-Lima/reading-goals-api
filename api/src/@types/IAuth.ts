import type { JwtPayload } from 'jsonwebtoken';
import type { IUserSafe } from './IUser';

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export type IAuth = IUserSafe & {
  tokens: ITokens;
};

export type IDecodedToken = JwtPayload & {
  userId: string;
  rememberMe?: boolean;
};

export interface IForgotPassword {
  token: string;
  expires_at: Date;
  used_at?: Date | null;
  user_id: string;
}
