import type { INote, IUpdateNote } from '../../@types/INote';

export interface ICreateNoteUseCase {
  execute(note: INote, bookId: string): Promise<INote>;
}

export interface IGetNotesByBookIdUseCase {
  execute(userId: string, bookId?: string): Promise<INote[]>;
}

export interface IGetNoteByIdUseCase {
  execute(noteId: string, userId: string): Promise<INote>;
}

export interface IUpdateNoteUseCase {
  execute(noteId: string, updateNoteParams: IUpdateNote): Promise<INote>;
}

export interface IDeleteNoteUseCase {
  execute(noteId: string): Promise<INote | null>;
}
