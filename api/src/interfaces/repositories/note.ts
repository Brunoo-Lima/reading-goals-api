import type { INote, IUpdateNote } from '../../@types/INote';

export interface ICreateNoteRepository {
  execute(note: INote): Promise<INote>;
}

export interface IGetNotesByUserIdRepository {
  execute(userId: string): Promise<INote[]>;
}

export interface IGetNoteByIdRepository {
  execute(noteId: string): Promise<INote | null>;
}

export interface IUpdateNoteRepository {
  execute(noteId: string, updateNoteParams: IUpdateNote): Promise<INote>;
}
