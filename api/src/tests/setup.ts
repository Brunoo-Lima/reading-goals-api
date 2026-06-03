import { prisma } from '../lib/prisma';
import { beforeEach } from 'vitest';

beforeEach(async () => {
  await prisma.user.deleteMany({});
  await prisma.note.deleteMany({});
  await prisma.readingLog.deleteMany({});
  await prisma.book.deleteMany({});
  await prisma.goal.deleteMany({});
});
