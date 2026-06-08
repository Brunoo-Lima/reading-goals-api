import { prisma } from '../lib/prisma';
import { beforeEach } from 'vitest';

beforeEach(async () => {
  await prisma.user.deleteMany({});
});
