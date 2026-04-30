import type { ITokens } from '../../@types/IAuth';

export interface ITokensGeneratorAdapter {
  execute(userId: string, rememberMe?: boolean): ITokens;
}
