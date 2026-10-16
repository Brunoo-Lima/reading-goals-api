import { CoverProviderUnavailableError } from '../../errors';
import { CoverBookSearchAdapter } from '../cover-book-search';

describe('CoverBookSearchAdapter', () => {
  test('should return valid book covers', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          docs: [
            { title: 'Dune', cover_i: 123, author_name: ['Frank Herbert'] },
          ],
        }),
      }),
    );

    const result = await new CoverBookSearchAdapter().execute('Dune');

    expect(result).toEqual([
      {
        title: 'Dune',
        cover_id: 123,
        cover_url: 'https://covers.openlibrary.org/b/id/123-L.jpg',
        author: 'Frank Herbert',
      },
    ]);
  });

  test('should ignore books without a valid cover', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ docs: [{ title: 'Dune', cover_i: 0 }] }),
      }),
    );

    await expect(new CoverBookSearchAdapter().execute('Dune')).resolves.toEqual(
      [],
    );
  });

  test('should throw CoverProviderUnavailableError if provider fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));

    await expect(new CoverBookSearchAdapter().execute('Dune')).rejects.toThrow(
      CoverProviderUnavailableError,
    );
  });
});
