import { LogOutController } from '../logout';

describe('LogOutController', () => {
  const makeSut = () => {
    const response = { clearCookie: vi.fn() };

    const sut = new LogOutController();

    return { sut, response };
  };

  test('should return 204 and clear authentication cookies', async () => {
    const { sut, response } = makeSut();

    const result = await sut.execute(response as any);

    expect(result.statusCode).toBe(204);
    expect(response.clearCookie).toHaveBeenCalledTimes(2);
    expect(response.clearCookie).toHaveBeenNthCalledWith(
      1,
      'accessToken',
      expect.any(Object),
    );
    expect(response.clearCookie).toHaveBeenNthCalledWith(
      2,
      'refreshToken',
      expect.any(Object),
    );
  });

  test('should return 500 if clearing cookies throws', async () => {
    const { sut, response } = makeSut();

    response.clearCookie.mockImplementationOnce(() => {
      throw new Error();
    });

    const result = await sut.execute(response as any);

    expect(result.statusCode).toBe(500);
  });
});
