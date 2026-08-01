import type { IForgotPassword } from '../../@types/IAuth';

export interface IForgotPasswordRepository {
  execute(forgotPasswordParams: IForgotPassword): Promise<void>;
  invalidatePrevious(user_id: string): Promise<void>;
}

export interface IPasswordResetByTokenRepository {
  execute(token: string): Promise<IForgotPassword | null>;
}

export interface IMarkPasswordResetAsUsedRepository {
  execute(token: string): Promise<void>;
}
