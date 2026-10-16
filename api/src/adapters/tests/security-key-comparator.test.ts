import { SecurityKeyComparatorAdapter } from '../security-key-comparator';
import { SecurityKeyHashAdapter } from '../security-key-hash';

describe('SecurityKeyComparatorAdapter', () => {
  test('should return true when security keys match', async () => {
    const hash = await new SecurityKeyHashAdapter().execute('security-key');

    const sut = new SecurityKeyComparatorAdapter();

    await expect(sut.execute('security-key', hash)).resolves.toBe(true);
  });

  test('should return false when security keys do not match', async () => {
    const hash = await new SecurityKeyHashAdapter().execute('security-key');

    const sut = new SecurityKeyComparatorAdapter();

    await expect(sut.execute('invalid-key', hash)).resolves.toBe(false);
  });
});
