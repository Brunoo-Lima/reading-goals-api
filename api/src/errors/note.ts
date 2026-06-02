export class NotePageNumberExceedsTotalPagesError extends Error {
  constructor() {
    super('Page number cannot be greater than total pages of the book.');
    this.name = 'NotePageNumberExceedsTotalPagesError';
  }
}
