import type { IUser } from '../../@types/IUser';

export interface ICreateUserRepository {
  execute(user: IUser): Promise<IUser>;
}
