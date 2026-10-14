import type { ICoverSearchAdapter } from '../../interfaces/adapters';

export class CoverBookSearchUseCase {
  private coverSearchAdapter: ICoverSearchAdapter;

  constructor(coverSearchAdapter: ICoverSearchAdapter) {
    this.coverSearchAdapter = coverSearchAdapter;
  }

  async execute(title: string) {
    return this.coverSearchAdapter.execute(title);
  }
}
