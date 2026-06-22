import type { INote, IUpdateNote } from '../../@types/INote';

export interface ICreateNoteRepository {
  execute(note: INote): Promise<INote>;
}

export interface IGetNotesByBookIdRepository {
  execute(userId: string, bookId?: string): Promise<INote[]>;
}

export interface IGetNoteByIdRepository {
  execute(noteId: string): Promise<INote | null>;
}

export interface IUpdateNoteRepository {
  execute(noteId: string, updateNoteParams: IUpdateNote): Promise<INote>;
}

export interface IDeleteNoteRepository {
  execute(noteId: string): Promise<INote | null>;
}
