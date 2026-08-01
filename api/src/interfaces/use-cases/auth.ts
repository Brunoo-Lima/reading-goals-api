import type { IAuth, ITokens } from '../../@types/IAuth';

export interface ILoginUseCase {
  execute(email: string, password: string, rememberMe: boolean): Promise<IAuth>;
}

export interface IRefreshTokenUseCase {
  execute(refreshToken: string): Promise<ITokens>;
}

export interface IForgotPasswordUseCase {
  execute(email: string, securityKey: string): Promise<void>;
}

export interface IResetPasswordUseCase {
  execute(token: string, password: string): Promise<void>;
}
