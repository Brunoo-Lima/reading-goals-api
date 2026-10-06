import type { IBook } from '@/@types/IBook';
import { Button } from '@/components/ui/button';
import { exportBooksToExcel, exportBooksToPdf } from '@/lib/export-books';
import { useState } from 'react';

interface IExportBookProps {
  books: IBook[];
}

type ExportType = 'pdf' | 'excel';

export const ExportBook = ({ books }: IExportBookProps) => {
  const [loading, setLoading] = useState<ExportType | null>(null);

  const handleExport = async (type: ExportType) => {
    try {
      setLoading(type);
      if (type === 'pdf') await exportBooksToPdf(books);
      else await exportBooksToExcel(books);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="p-2 rounded-lg">
      <h3 className="font-bold text-foreground mb-6">Exportar livros</h3>

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => handleExport('excel')}
          disabled={!books.length || loading !== null}
          className="px-4 py-2 rounded-md border disabled:opacity-50"
        >
          {loading === 'excel' ? 'Gerando...' : 'Exportar Excel'}
        </Button>
        <Button
          variant="outline"
          onClick={() => handleExport('pdf')}
          disabled={!books.length || loading !== null}
          className="px-4 py-2 rounded-md border disabled:opacity-50"
        >
          {loading === 'pdf' ? 'Gerando...' : 'Exportar PDF'}
        </Button>
      </div>
    </div>
  );
};
