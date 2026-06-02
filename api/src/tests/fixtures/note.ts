import { faker } from '@faker-js/faker';

export const note = {
  id: faker.string.uuid(),
  content: faker.lorem.sentence(),
  rating: faker.number.int({ min: 1, max: 5 }),
  page_number: 300,
  user_id: faker.string.uuid(),
  book_id: faker.string.uuid(),
  created_at: faker.date.anytime(),
  updated_at: faker.date.anytime(),
};

export const notes = [
  {
    id: faker.string.uuid(),
    content: faker.lorem.sentence(),
    rating: faker.number.int({ min: 1, max: 5 }),
    page_number: 300,
    user_id: faker.string.uuid(),
    book_id: faker.string.uuid(),
    created_at: faker.date.anytime(),
    updated_at: faker.date.anytime(),
  },
];
