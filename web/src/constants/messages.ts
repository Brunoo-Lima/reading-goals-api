export const messages = {
  success: {
    login: 'Login realizado com sucesso.',
  },

  error: {
    generic: 'Ocorreu um erro inesperado. Tente novamente.',
  },
} as const;

export const apiErrorMessages: Record<string, string> = {
  EMAIL_ALREADY_EXISTS: 'E-mail já está cadastrado.',
  INVALID_CREDENTIALS: 'E-mail ou senha inválidos.',
  USER_NOT_FOUND: 'Usuário não encontrado.',
  RESET_PASSWORD_SUCCESS: 'Senha alterada com sucesso!',
  BOOK_NOT_FOUND: 'Livro não encontrado.',
  BOOK_ALREADY_EXISTS: 'Livro já cadastrado!',
  INVALID_CURRENT_PAGE_NOT_EXCEED_TOTAL_PAGES:
    'A página atual não pode ser maior que o total de páginas',
  INVALID_BOOK_DATES:
    'A data de término não pode ser anterior à data de início',
  INVALID_BOOK_TITLE: 'Título de livro inválido',
  INVALID_BOOK_GENRE: 'Gênero inválido',
  INVALID_BOOK_STATUS: 'Status inválido',
  EXCEEDS_TOTAL_PAGES:
    'O número da página não pode ser maior que o total de páginas do livro.',
  GOAL_NOT_FOUND: 'Meta não encontrada.',
  NOTE_NOT_FOUND: 'Nota não encontrada.',
  INVALID_TOKEN: 'Token inválido.',
  EXPIRED_TOKEN: 'Token expirado.',
  VALIDATION_ERROR: 'Verifique os dados informados.',
  UNAUTHORIZED: 'Sua sessão expirou. Faça login novamente.',
  FORBIDDEN: 'Você não tem permissão para realizar esta ação.',
  INTERNAL_ERROR: 'Ocorreu um erro inesperado. Tente novamente.',
  EXTERNAL_ERROR: 'Ocorreu um error externo. Tente novamente.',
  GOAL_PROGRESS_EXCEEDS_TARGET_ERROR:
    'O progresso da meta não pode exceder o valor-alvo',
};
