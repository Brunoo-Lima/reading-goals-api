export const tools = [
  {
    type: 'function' as const,
    strict: false,
    name: 'list_my_books',
    description:
      'Lista os livros do usuário autenticado. Use para recomendações baseadas no acervo e histórico.',
    parameters: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['READING', 'COMPLETED', 'WISHLIST', 'ABANDONED'],
        },
        search: { type: 'string' },
      },
      additionalProperties: false,
    },
  },
  {
    type: 'function' as const,
    strict: false,
    name: 'add_book',
    description:
      'Adiciona um livro ao acervo do usuário. Só use depois de obter os dados necessários ou confirmar os dados inferidos.',
    parameters: {
      type: 'object',
      required: ['title', 'author', 'genre', 'total_pages'],
      properties: {
        title: { type: 'string' },
        author: { type: 'string' },
        genre: { type: 'array', items: { type: 'string' } },
        total_pages: { type: 'integer', minimum: 1 },
        status: {
          type: 'string',
          enum: ['READING', 'COMPLETED', 'WISHLIST', 'ABANDONED'],
        },
      },
      additionalProperties: false,
    },
  },
  {
    type: 'function' as const,
    strict: false,
    name: 'update_book',
    description:
      'Atualiza avaliação, status ou progresso de um livro do usuário.',
    parameters: {
      type: 'object',
      required: ['book_id'],
      properties: {
        book_id: { type: 'string' },
        rating: { type: 'integer', minimum: 1, maximum: 5 },
        status: {
          type: 'string',
          enum: ['READING', 'COMPLETED', 'WISHLIST', 'ABANDONED'],
        },
        current_page: { type: 'integer', minimum: 0 },
      },
      additionalProperties: false,
    },
  },
];
