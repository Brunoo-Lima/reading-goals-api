import type { IUser } from '../../@types/IUser';

import type {
  ICreateUserRepository,
  IGetUserByEmailRepository,
} from '../../interfaces/repositories/user';
import type {
  IPasswordHashAdapter,
  IIdGeneratorAdapter,
} from '../../interfaces/adapters';
import { EmailAlreadyInUseError } from '../../errors';

export class CreateUserUseCase {
  private getUserByEmailRepository: IGetUserByEmailRepository;
  private createUserRepository: ICreateUserRepository;
  private idGeneratorAdapter: IIdGeneratorAdapter;
  private passwordHashAdapter: IPasswordHashAdapter;

  constructor(
    getUserByEmailRepository: IGetUserByEmailRepository,
    createUserRepository: ICreateUserRepository,
    idGeneratorAdapter: IIdGeneratorAdapter,
    passwordHashAdapter: IPasswordHashAdapter,
  ) {
    this.getUserByEmailRepository = getUserByEmailRepository;
    this.createUserRepository = createUserRepository;
    this.idGeneratorAdapter = idGeneratorAdapter;
    this.passwordHashAdapter = passwordHashAdapter;
  }

  async execute(user: IUser) {
    const userAlreadyExists = await this.getUserByEmailRepository.execute(
      user.email,
    );

    if (userAlreadyExists) {
      throw new EmailAlreadyInUseError(user.email);
    }

    const userId = this.idGeneratorAdapter.execute();

    const hashedPassword = await this.passwordHashAdapter.execute(
      user.password,
    );

    const userData = {
      ...user,
      password: hashedPassword,
      id: userId,
    };

    return await this.createUserRepository.execute(userData);
  }
}
