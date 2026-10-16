import { SecurityKeyHashAdapter } from '../security-key-hash';

describe('SecurityKeyHashAdapter', () => {
  test('should hash a security key', async () => {
    const sut = new SecurityKeyHashAdapter();

    const result = await sut.execute('security-key');

    expect(result).toBeTruthy();
    expect(result).not.toBe('security-key');
  });
});
