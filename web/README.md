# Reading Goals Web

Interface web do Diário de Metas de Leitura, construída com React, TypeScript e Vite. Permite administrar a biblioteca, acompanhar a leitura, criar metas, registrar progresso e consultar estatísticas.

## Funcionalidades disponíveis

- cadastro, login, logout e recuperação/redefinição de senha;
- visão geral com livros em leitura, progresso diário, páginas lidas e streak;
- biblioteca com cadastro, edição, exclusão, status, gêneros, avaliação e capa;
- busca de capas por título;
- notas por livro e registros de sessões de leitura;
- metas de páginas, livros, total de páginas e livro específico;
- estatísticas de livros, páginas, metas, avaliações e streak;
- exportação da biblioteca para Excel e PDF;
- layout responsivo e feedback das operações.

## Stack

React 19, TypeScript, Vite, React Router, TanStack Query, Axios, React Hook Form, Zod, Tailwind CSS, Radix UI, date-fns, ExcelJS e jsPDF.

## Executar localmente

Na pasta `web`, crie `.env` apontando `VITE_API_URL` para a API:

```env
VITE_API_URL=http://localhost:3000
```

Depois execute `pnpm install` e `pnpm run dev`.

## Scripts

```bash
pnpm run build    # checagem TypeScript e build de produção
pnpm run lint
pnpm run preview  # pré-visualiza o build
```

## Rotas

Públicas: `/`, `/registro`, `/esqueci-senha` e `/redefinir-senha`.

Protegidas: `/geral`, `/livros`, `/metas`, `/estatisticas` e `/conta`.

As requisições usam cookies de sessão, timeout de 10 segundos e uma tentativa automática de renovação após `401`. A rota de chat ainda não está habilitada na navegação.
