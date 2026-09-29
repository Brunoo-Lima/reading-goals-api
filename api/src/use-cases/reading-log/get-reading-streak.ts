import type { IReadingStreak } from '../../@types/IReadingStreak';
import { UserNotFoundError } from '../../errors';
import type {
  IGetReadingLogDatesRepository,
  IGetUserByIdRepository,
} from '../../interfaces/repositories';

const formatters = new Map<string, Intl.DateTimeFormat>();

const toDateKey = (date: Date, timeZone: string) => {
  let formatter = formatters.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    formatters.set(timeZone, formatter);
  }
  return formatter.format(date); // "2026-09-29"
};

const shiftDay = (key: string, days: number) => {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
};

export class GetReadingStreakUseCase {
  private getReadingLogDatesRepository: IGetReadingLogDatesRepository;
  private getUserByIdRepository: IGetUserByIdRepository;
  private current_date: () => Date = () => new Date();

  constructor(
    getReadingLogDatesRepository: IGetReadingLogDatesRepository,
    getUserByIdRepository: IGetUserByIdRepository,
    current_date?: () => Date,
  ) {
    this.getReadingLogDatesRepository = getReadingLogDatesRepository;
    this.getUserByIdRepository = getUserByIdRepository;
    if (current_date) {
      this.current_date = current_date;
    }
  }

  async execute(userId: string): Promise<IReadingStreak> {
    const user = await this.getUserByIdRepository.execute(userId);

    if (!user) throw new UserNotFoundError();

    const readingLogDates = await this.getReadingLogDatesRepository.execute(
      user.id,
    );

    return this.calculateStreak(readingLogDates, user.timeZone);
  }

  private calculateStreak(
    readingLogDates: Date[],
    timeZone: string,
  ): IReadingStreak {
    const today = toDateKey(this.current_date(), timeZone);

    const dates = Array.from(
      new Set(readingLogDates.map((d) => toDateKey(d, timeZone))),
    )
      .filter((d) => d <= today)
      .sort();

    if (!dates.length) {
      return {
        currentStreak: 0,
        longestStreak: 0,
        lastReadingDate: null,
        readToday: false,
      };
    }

    const dateSet = new Set(dates);
    const readToday = dateSet.has(today);

    let currentStreak = 0;
    let cursor = readToday ? today : shiftDay(today, -1);
    while (dateSet.has(cursor)) {
      currentStreak += 1;
      cursor = shiftDay(cursor, -1);
    }

    let longestStreak = 1;
    let streak = 1;
    for (let i = 1; i < dates.length; i += 1) {
      streak = shiftDay(dates[i - 1], 1) === dates[i] ? streak + 1 : 1;
      longestStreak = Math.max(longestStreak, streak);
    }

    return {
      currentStreak,
      longestStreak,
      lastReadingDate: dates[dates.length - 1],
      readToday,
    };
  }
}
