import { UserNotFoundError } from '../../errors';
import type { IGetUserByIdRepository } from '../../interfaces/repositories';

export class GetUserByIdUseCase {
  private getUserByIdRepository: IGetUserByIdRepository;

  constructor(getUserByIdRepository: IGetUserByIdRepository) {
    this.getUserByIdRepository = getUserByIdRepository;
  }

  async execute(id: string) {
    const user = await this.getUserByIdRepository.execute(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }
}
