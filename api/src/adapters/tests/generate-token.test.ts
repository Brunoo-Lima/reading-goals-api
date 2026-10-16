import { GenerateTokenAdapter } from '../generate-token';

describe('GenerateTokenAdapter', () => {
  test('should generate a token', () => {
    const sut = new GenerateTokenAdapter();

    const result = sut.execute();

    expect(result).toBeTruthy();
    expect(typeof result).toBe('string');
  });

  test('should generate different tokens', () => {
    const sut = new GenerateTokenAdapter();

    expect(sut.execute()).not.toBe(sut.execute());
  });
});
