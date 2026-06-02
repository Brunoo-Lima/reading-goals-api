export class NotePageNumberExceedsTotalPagesError extends Error {
  constructor() {
    super('Page number cannot be greater than total pages of the book.');
    this.name = 'NotePageNumberExceedsTotalPagesError';
  }
}

export class NoteNotFoundError extends Error {
  constructor(noteId?: string) {
    super(`Note with id ${noteId ? `'${noteId}'` : ''} not found.`);
    this.name = 'NoteNotFoundError';
  }
}
