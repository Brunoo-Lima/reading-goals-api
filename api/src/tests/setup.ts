import { prisma } from '../lib/prisma';
import { beforeEach } from 'vitest';

beforeEach(async () => {
  const deleted = await prisma.user.deleteMany({});
  console.log(`[beforeEach] deleted ${deleted.count} users`);
});
