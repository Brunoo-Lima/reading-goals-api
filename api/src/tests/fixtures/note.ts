import { faker } from '@faker-js/faker';

export const note = {
  id: faker.string.uuid(),
  content: faker.lorem.sentence(),
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
    page_number: 300,
    user_id: faker.string.uuid(),
    book_id: faker.string.uuid(),
    created_at: faker.date.anytime(),
    updated_at: faker.date.anytime(),
  },
];
