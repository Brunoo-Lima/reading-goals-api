import type { INote } from '../../@types/INote';

export interface ICreateNoteRepository {
  execute(note: INote): Promise<INote>;
}
