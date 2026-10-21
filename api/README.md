# Reading Goals API

API REST do Diário de Metas de Leitura, construída com Node.js, TypeScript e Express. Gerencia contas, autenticação por cookies, livros, capas, notas, sessões de leitura, metas e sequência de leitura.

## Stack

- Node.js + TypeScript + Express
- PostgreSQL + Prisma
- Zod para validação
- JWT em cookies `httpOnly` (`accessToken` e `refreshToken`)
- Vitest, Supertest, ESLint e Prettier
- Docker Compose para PostgreSQL

## Executar localmente

Na pasta `api`, configure `.env` com `DATABASE_URL`, `PORT`, `API_URL_FRONTEND` e os segredos/expirações dos tokens. Depois:

```bash
pnpm install
pnpm run docker:up      # subi o banco
pnpm run docker:down    # desligar o banco
pnpm run prisma:migrate:deploy
pnpm run dev
```

## Scripts

```bash
pnpm test                 # testes configurados
pnpm run test:run         # execução única
pnpm run test:e2e         # testes end-to-end com .env.test
pnpm run test:coverage    # cobertura
pnpm run eslint:check
pnpm run prettier:check
pnpm run prisma:generate
```

## Endpoints

Todos usam o prefixo `/api/v1`. Cadastro e autenticação são públicos; os demais exigem sessão autenticada.

- `/users` -> criar conta; consultar, editar e excluir `/users/me`
- `/auth` -> login, logout, refresh token, recuperação e redefinição de senha
- `/books` -> listar com `search`, `genre` e `status`; consultar, criar, editar, excluir e buscar capas
- `/reading-logs` -> registrar/listar sessões, listar por livro e consultar streak
- `/goals` -> criar, listar, consultar, editar, excluir e registrar progresso
- `/notes` -> criar, listar por livro, consultar, editar e excluir

A documentação Swagger fica em `/docs`.
Os contratos completos estão em [`docs/swagger.json`](docs/swagger.json) e na interface Swagger em `/docs`.

## Organização

- `src/router`: rotas e autenticação
- `src/controllers`: entrada HTTP e respostas
- `src/use-cases`: regras de negócio
- `src/repositories/postgres`: persistência
- `src/adapters`: tokens, hashes, IDs e busca de capas
- `prisma`: schema e migrations
