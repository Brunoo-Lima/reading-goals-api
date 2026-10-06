import type { IBook } from '@/@types/IBook';
import { STATUS_LABEL } from './label-book';
import { formatDate } from '@/utils/format-date';
import { genres } from '@/utils/genre-list';

function download(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
const statusLabel = (s: string) => STATUS_LABEL[s] ?? s;
const genreLabel = (g: string[]) =>
  g.map((genre) => genres.find((g) => g.value === genre)?.label ?? genre);

export async function exportBooksToExcel(books: IBook[]) {
  // import dinâmico: não pesa o bundle inicial
  const { Workbook } = await import('exceljs');

  const wb = new Workbook();
  const ws = wb.addWorksheet('Livros');

  ws.columns = [
    { header: 'Título', key: 'title', width: 35 },
    { header: 'Autor', key: 'author', width: 25 },
    { header: 'Status', key: 'status', width: 15 },
    { header: 'Páginas', key: 'total_pages', width: 10 },
    { header: 'Gênero', key: 'genre', width: 25 },
    { header: 'Avaliação', key: 'rating', width: 8 },
    { header: 'Página Atual', key: 'current_page', width: 15 },
    { header: 'Início', key: 'start_date', width: 20 },
    { header: 'Fim', key: 'end_date', width: 20 },
  ];
  ws.addRows(
    books.map((b) => ({
      ...b,
      genre: genreLabel(b.genre).join(', '),
      status: statusLabel(b.status),
      start_date: formatDate(b.start_date),
      end_date: formatDate(b.end_date),
    })),
  );
  ws.getRow(1).font = { bold: true };

  const buffer = await wb.xlsx.writeBuffer();
  download(
    new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    }),
    'livros.xlsx',
  );
}

export async function exportBooksToPdf(books: IBook[]) {
  const [{ jsPDF }, { default: autoTable }] = await Promise.all([
    import('jspdf'),
    import('jspdf-autotable'),
  ]);

  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text('Meus livros', 14, 16);

  autoTable(doc, {
    startY: 22,
    head: [
      [
        'Título',
        'Autor',
        'Status',
        'Gênero',
        'Páginas',
        'Página Atual',
        'Avaliação',
        'Início',
        'Fim',
      ],
    ],
    body: books.map((b) => [
      b.title,
      b.author,
      statusLabel(b.status),
      genreLabel(b.genre).join(', '),
      b.total_pages ?? '-',
      b.current_page ?? '-',
      b.rating ?? '-',
      formatDate(b.start_date) ?? '-',
      formatDate(b.end_date) ?? '-',
    ]),
  });

  doc.save('livros.pdf');
}
