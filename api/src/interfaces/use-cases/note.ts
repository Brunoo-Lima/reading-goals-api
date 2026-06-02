import type { INote } from '../../@types/INote';

export interface ICreateNoteUseCase {
  execute(note: INote, bookId: string): Promise<INote>;
}
