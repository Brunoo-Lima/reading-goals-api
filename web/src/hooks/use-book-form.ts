import type { IBook } from '@/@types/IBook';
import { useState } from 'react';

export function useBookForm() {
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<IBook | null>(null);

  const createBook = () => {
    setEditingBook(null);
    setShowForm(true);
  };

  const editBook = (book: IBook) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingBook(null);
  };

  return {
    showForm,
    editingBook,
    createBook,
    editBook,
    closeForm,
    setShowForm,
  };
}
