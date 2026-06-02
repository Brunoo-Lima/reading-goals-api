export class NotePageNumberExceedsTotalPagesError extends Error {
  constructor() {
    super('Page number cannot be greater than total pages of the book.');
    this.name = 'NotePageNumberExceedsTotalPagesError';
  }
}

export class NoteFoundError extends Error {
  constructor() {
    super('Note not found.');
    this.name = 'NoteFoundError';
  }
}
