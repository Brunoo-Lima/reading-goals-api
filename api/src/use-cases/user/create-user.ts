import type { IUser } from '../../@types/IUser';

import type {
  ICreateUserRepository,
  IGetUserByEmailRepository,
} from '../../interfaces/repositories/user';
import type {
  IPasswordHashAdapter,
  IIdGeneratorAdapter,
  ISecurityKeyHashAdapter,
} from '../../interfaces/adapters';
import { EmailAlreadyInUseError } from '../../errors';

export class CreateUserUseCase {
  private getUserByEmailRepository: IGetUserByEmailRepository;
  private createUserRepository: ICreateUserRepository;
  private idGeneratorAdapter: IIdGeneratorAdapter;
  private passwordHashAdapter: IPasswordHashAdapter;
  private securityKeyHashAdapter: ISecurityKeyHashAdapter;

  constructor(
    getUserByEmailRepository: IGetUserByEmailRepository,
    createUserRepository: ICreateUserRepository,
    idGeneratorAdapter: IIdGeneratorAdapter,
    passwordHashAdapter: IPasswordHashAdapter,
    securityKeyHashAdapter: ISecurityKeyHashAdapter,
  ) {
    this.getUserByEmailRepository = getUserByEmailRepository;
    this.createUserRepository = createUserRepository;
    this.idGeneratorAdapter = idGeneratorAdapter;
    this.passwordHashAdapter = passwordHashAdapter;
    this.securityKeyHashAdapter = securityKeyHashAdapter;
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

    const hashedSecurityKey = await this.securityKeyHashAdapter.execute(
      user.securityKey || '',
    );

    const userData = {
      ...user,
      password: hashedPassword,
      securityKey: hashedSecurityKey,
      id: userId,
    };

    const createdUser = await this.createUserRepository.execute(userData);

    return {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      created_at: createdUser.created_at,
      updated_at: createdUser.updated_at,
    };
  }
}
