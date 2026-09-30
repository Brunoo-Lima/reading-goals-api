import { faker } from '@faker-js/faker';
import { UserNotFoundError } from '../../../errors';
import { user } from '../../../tests';
import { GetReadingStreakUseCase } from '../get-reading-streak';

const now = new Date('2026-09-28T12:00:00.000Z');
const day = (offset: number) =>
  new Date(now.getTime() + offset * 24 * 60 * 60 * 1000);

describe('Get Reading Streak Use Case', () => {
  class ReadingLogDatesRepositoryStub {
    async execute() {
      return [day(0), day(-1), day(-2)];
    }
  }

  class UserByIdRepositoryStub {
    async execute() {
      return user;
    }
  }

  const makeSut = () => {
    const readingLogDatesRepository = new ReadingLogDatesRepositoryStub();
    const userByIdRepository = new UserByIdRepositoryStub();
    const sut = new GetReadingStreakUseCase(
      readingLogDatesRepository,
      userByIdRepository,
      () => now,
    );

    return { sut, readingLogDatesRepository, userByIdRepository };
  };

  test('should calculate streaks from distinct reading days', async () => {
    const { sut, readingLogDatesRepository } = makeSut();
    vi.spyOn(readingLogDatesRepository, 'execute').mockResolvedValueOnce([
      day(0),
      day(-1),
      day(-1),
      day(-2),
      day(-7),
      day(-6),
      day(-5),
      day(-4),
    ]);

    await expect(sut.execute(user.id)).resolves.toEqual({
      currentStreak: 3,
      longestStreak: 4,
      lastReadingDate: '2026-09-28',
      readToday: true,
    });
  });

  test('should keep a streak active when the last reading was yesterday', async () => {
    const { sut, readingLogDatesRepository } = makeSut();
    vi.spyOn(readingLogDatesRepository, 'execute').mockResolvedValueOnce([
      day(-1),
      day(-2),
    ]);

    await expect(sut.execute(user.id)).resolves.toMatchObject({
      currentStreak: 2,
      readToday: false,
    });
  });

  test('should return a zero current streak after a missed day', async () => {
    const { sut, readingLogDatesRepository } = makeSut();
    vi.spyOn(readingLogDatesRepository, 'execute').mockResolvedValueOnce([
      day(-2),
    ]);

    await expect(sut.execute(user.id)).resolves.toMatchObject({
      currentStreak: 0,
      longestStreak: 1,
      lastReadingDate: '2026-09-26',
    });
  });

  test('should return UserNotFoundError if user is not found', async () => {
    const { sut, userByIdRepository } = makeSut();
    vi.spyOn(userByIdRepository, 'execute').mockResolvedValueOnce(null as any);

    await expect(sut.execute(faker.string.uuid())).rejects.toThrow(
      new UserNotFoundError(),
    );
  });
});
