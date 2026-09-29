import type { IReadingLog } from '../..//IReadingLog';
import type { IReadingStreak } from '../..//IReadingStreak';

export interface IRegisterReadingLogUseCase {
  execute(
    readingLog: IReadingLog,
    userId: string,
    bookId: string,
  ): Promise<IReadingLog>;
}

export interface IGetReadingLogUseCase {
  execute(userId: string): Promise<IReadingLog[]>;
}

export interface IGetReadingLogsByBookIdUseCase {
  execute(bookId: string, userId: string): Promise<IReadingLog[]>;
}

export interface IGetReadingStreakUseCase {
  execute(userId: string): Promise<IReadingStreak>;
}
