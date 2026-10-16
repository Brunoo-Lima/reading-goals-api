import { CoverBookSearchUseCase } from '../cover-book-search';

describe('CoverBookSearchUseCase', () => {
  const coverFake = {
    cover_id: 1,
    title: 'Dune',
    author: 'Frank Herbert',
    cover_url: 'https://example.com/cover.jpg',
  };

  class CoverBookSearchAdapterStub {
    async execute() {
      return [coverFake];
    }
  }

  const makeSut = () => {
    const coverBookSearchAdapter = new CoverBookSearchAdapterStub();

    const sut = new CoverBookSearchUseCase(coverBookSearchAdapter);

    return { sut, coverBookSearchAdapter };
  };

  it('should return covers successfully', async () => {
    const { sut } = makeSut();

    const result = await sut.execute('Dune');

    expect(result).toEqual([coverFake]);
  });

  it('should throw if CoverBookSearchAdapter throws', async () => {
    const { sut, coverBookSearchAdapter } = makeSut();

    vi.spyOn(coverBookSearchAdapter, 'execute').mockRejectedValueOnce(
      new Error(),
    );

    await expect(sut.execute('Dune')).rejects.toThrow();
  });
});
