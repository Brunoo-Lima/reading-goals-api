import bcrypt from 'bcryptjs';
import type { IUser } from '../../@types/IUser';
import { v4 as uuid } from 'uuid';
import type { ICreateUserRepository } from '../../interfaces/repositories/user';

export class CreateUserUseCase {
  private createUserRepository: ICreateUserRepository;
  constructor(createUserRepository: ICreateUserRepository) {
    this.createUserRepository = createUserRepository;
  }

  async execute(user: IUser) {
    const userId = uuid();

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const createUser = await this.createUserRepository.execute({
      ...user,
      password: hashedPassword,
      id: userId,
    });

    return createUser;
  }
}
