import { faker } from '@faker-js/faker';
import { GoalsType } from '../../../generated/prisma/enums';

export const goal = {
  id: faker.string.uuid(),
  type: GoalsType.DAILY_PAGES,
  user_id: faker.string.uuid(),
  book_id: faker.string.uuid(),
  target_value: faker.number.int(),
  current_value: 0,
  start_date: faker.date.anytime(),
  end_date: null,
  is_active: true,
  created_at: faker.date.anytime(),
  updated_at: faker.date.anytime(),
};

export const goals = [
  {
    id: faker.string.uuid(),
    type: GoalsType.DAILY_PAGES,
    user_id: faker.string.uuid(),
    book_id: faker.string.uuid(),
    target_value: faker.number.int(),
    current_value: 1,
    start_date: faker.date.anytime(),
    end_date: null,
    is_active: true,
    created_at: faker.date.anytime(),
    updated_at: faker.date.anytime(),
  },
];
