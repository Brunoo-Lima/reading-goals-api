import { CoverProviderUnavailableError } from '../errors';
import type { ICoverSearchAdapter } from '../interfaces/adapters';

export class CoverBookSearchAdapter implements ICoverSearchAdapter {
  async execute(title: string) {
    const res = await fetch(
      `${process.env.API_LIB_BOOKS_URL}/search.json?title=${encodeURIComponent(title)}&limit=1`,
      { signal: AbortSignal.timeout(5000) },
    );

    if (!res.ok) throw new CoverProviderUnavailableError();

    let data: { docs?: any[] };

    try {
      data = await res.json();
    } catch {
      throw new CoverProviderUnavailableError();
    }

    return (data.docs ?? [])
      .filter((d: any) => Number.isInteger(d.cover_i) && d.cover_i > 0)
      .map((d: any) => ({
        title: d.title,
        cover_id: d.cover_i,
        cover_url: `https://covers.openlibrary.org/b/id/${d.cover_i}-L.jpg`,
        ...(d.author_name?.[0] ? { author: d.author_name[0] } : {}),
      }));
  }
}
