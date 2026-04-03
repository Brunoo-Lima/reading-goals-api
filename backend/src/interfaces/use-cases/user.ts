import type { IUser } from '../../@types/IUser';

export interface ICreateUserUseCase {
  execute(user: IUser): Promise<IUser>;
}
