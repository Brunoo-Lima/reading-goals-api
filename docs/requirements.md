# Sistema de Diário de Metas de Leitura

## Objetivo

Desenvolver um sistema para que o leitor cadastre sua biblioteca, acompanhe o progresso de cada livro, registre sessões de leitura e notas, defina metas e consulte indicadores da sua evolução.

## Usuários do sistema

- **Usuário (leitor):** cria e administra a própria conta, seus livros, registros de leitura, notas e metas.

## Problemas identificados

- Falta de controle centralizado sobre livros e páginas lidas.
- Dificuldade para definir e acompanhar metas de leitura.
- Ausência de histórico de sessões e anotações associadas aos livros.
- Pouca visibilidade sobre estatísticas e consistência de leitura.

## Requisitos Funcionais

### Conta e autenticação

- **RF01 — Cadastrar usuário:** o sistema deve permitir o cadastro de usuário com nome, e-mail, senha e chave de segurança.
- **RF02 — Autenticar usuário:** o sistema deve permitir o login com e-mail e senha e iniciar uma sessão autenticada.
- **RF03 — Manter sessão:** o sistema deve renovar o token de acesso por meio do token de atualização quando a sessão expirar e ele for válido.
- **RF04 — Recuperar senha:** o sistema deve permitir solicitar a recuperação de senha informando e-mail e chave de segurança.
- **RF05 — Redefinir senha:** o sistema deve permitir definir uma nova senha mediante token válido de recuperação.
- **RF06 — Consultar dados da conta:** o usuário autenticado deve poder consultar seus próprios dados cadastrais.
- **RF07 — Editar usuário:** o usuário autenticado deve poder alterar seus dados cadastrais.
- **RF08 — Excluir usuário:** o usuário autenticado deve poder excluir a própria conta.
- **RF09 — Encerrar sessão:** o sistema deve permitir ao usuário encerrar a sessão e retornar à tela de login.

### Livros

- **RF10 — Cadastrar livro:** o usuário deve poder cadastrar livro com título, autor, um ou mais gêneros, status, total de páginas, página atual, avaliação e datas de leitura, quando aplicáveis.
- **RF11 — Consultar livros:** o usuário deve poder visualizar a lista e os detalhes dos seus livros.
- **RF12 — Filtrar livros:** o sistema deve permitir filtrar os livros por texto, gênero e status de leitura.
- **RF13 — Editar livro:** o usuário deve poder atualizar as informações de um livro próprio.
- **RF14 — Excluir livro:** o usuário deve poder excluir um livro próprio.
- **RF15 — Classificar status de leitura:** o sistema deve permitir classificar o livro como “quero ler”, “lendo”, “concluído” ou “abandonado”.
- **RF16 — Avaliar livro concluído:** o usuário deve poder atribuir uma avaliação numérica ao livro.

### Registros e notas de leitura

- **RF17 — Registrar sessão de leitura:** o usuário deve poder registrar páginas lidas, data da sessão e uma observação opcional para um livro.
- **RF18 — Consultar registros de leitura:** o usuário deve poder consultar todos os seus registros de leitura e os registros de um livro específico.
- **RF19 — Cadastrar nota:** o usuário deve poder criar nota textual vinculada a um livro, com número de página opcional.
- **RF20 — Consultar notas:** o usuário deve poder visualizar as notas de um livro e consultar uma nota individual.
- **RF21 — Editar nota:** o usuário deve poder alterar o conteúdo ou a página de uma nota.
- **RF22 — Excluir nota:** o usuário deve poder excluir uma nota.

### Metas e progresso

- **RF23 — Cadastrar meta:** o usuário deve poder criar metas de páginas diárias, livros por mês, livros por ano, total de páginas ou um livro específico.
- **RF24 — Vincular meta a livro:** o sistema deve permitir vincular uma meta do tipo “livro específico” a um livro da biblioteca.
- **RF25 — Consultar metas:** o usuário deve poder listar suas metas e consultar os detalhes de uma meta, incluindo seus registros de progresso.
- **RF26 — Editar meta:** o usuário deve poder alterar os dados de uma meta própria, inclusive seu estado de atividade.
- **RF27 — Excluir meta:** o usuário deve poder excluir uma meta.
- **RF28 — Registrar progresso de meta:** o usuário deve poder adicionar um incremento de progresso, com observação e data opcionais, a uma meta própria.

### Painéis e estatísticas

- **RF29 — Exibir visão geral:** o sistema deve apresentar resumo da biblioteca, páginas lidas, sequência de leitura, progresso diário e livros em leitura.
- **RF30 — Exibir estatísticas:** o sistema deve apresentar totais de livros por status, páginas lidas, metas concluídas, sequência atual e maior sequência de leitura.
- **RF31 — Calcular média de avaliações:** o sistema deve apresentar a média das avaliações dos livros concluídos que foram avaliados.
- **RF32 — Exibir conta:** o sistema deve disponibilizar uma área de conta com configurações do usuário e acesso à ação de exportar dados.

## Requisitos Não Funcionais

- **RNF01 — Responsividade:** a interface deve se adaptar a telas de celular, tablet e desktop.
- **RNF02 — Autenticação segura:** as sessões devem usar JWT em cookies `httpOnly`, com política `sameSite: strict`; o cookie deve usar o atributo `secure` em produção.
- **RNF03 — Proteção de rotas:** páginas e endpoints privados devem exigir uma sessão autenticada; solicitações sem credencial válida devem receber resposta de não autorizado.
- **RNF04 — Validação:** entradas da API e formulários da interface devem ser validados antes do processamento, com mensagens de erro ao usuário.
- **RNF05 — Confiabilidade do cliente:** as chamadas da interface devem ter tempo limite de 10 segundos e tentar renovar a sessão uma única vez após resposta 401.
- **RNF06 — Feedback de operação:** a interface deve informar ao usuário o resultado de operações de criação, edição, exclusão, login e registro de progresso.

## Regras de Negócio

- **RN01 — Campos obrigatórios do cadastro:** nome, e-mail, senha e chave de segurança são obrigatórios para criar uma conta.
- **RN02 — Formato e unicidade do e-mail:** o e-mail deve ter formato válido e não pode existir em mais de uma conta.
- **RN03 — Senha mínima:** a senha de cadastro, login e redefinição deve ter ao menos seis caracteres.
- **RN04 — Recuperação de senha:** a recuperação exige e-mail e chave de segurança compatíveis; o token de redefinição só pode ser usado uma vez e deve estar dentro do prazo de validade.
- **RN05 — Acesso autenticado:** somente o cadastro e os endpoints de autenticação são públicos; as demais operações exigem usuário autenticado.
- **RN06 — Exclusão de conta:** ao excluir a conta, os dados dependentes do usuário — livros, registros de leitura, metas, progressos e notas — devem ser removidos em cascata.
- **RN07 — Dados mínimos do livro:** todo livro deve possuir título, autor, pelo menos um gênero, status, total de páginas e data de início válida.
- **RN08 — Status permitidos:** o status do livro deve ser um entre `READING`, `COMPLETED`, `WISHLIST` e `ABANDONED`.
- **RN09 — Integridade de páginas:** o total de páginas deve ser maior que zero, a página atual não pode ser negativa nem maior que o total e a página de uma nota não pode superar o total de páginas do livro.
- **RN10 — Datas do livro:** quando informadas, a data final de leitura não pode ser anterior à data inicial.
- **RN11 — Identificação de livro:** não pode haver dois livros cadastrados com o mesmo título.
- **RN12 — Propriedade de livros:** o usuário só pode consultar, editar ou excluir livros vinculados à sua conta.
- **RN13 — Nota válida:** uma nota deve conter conteúdo; seu número de página, quando informado, deve ser maior que zero.
- **RN14 — Registro de leitura válido:** cada sessão deve informar quantidade de páginas maior que zero e uma data válida; a observação é opcional.
- **RN15 — Tipos e alvo de meta:** toda meta deve ter tipo permitido e valor-alvo maior que zero; seu valor atual não pode ser negativo.
- **RN16 — Datas da meta:** quando informadas, a data final da meta não pode ser anterior à data de início.
- **RN17 — Meta de livro específico:** a vinculação a livro é opcional, mas é utilizada para metas do tipo `SPECIFIC_BOOK`.
- **RN18 — Progresso incremental:** cada lançamento de progresso deve ser maior que zero e é somado ao valor atual da meta.
- **RN19 — Limite da meta:** o novo valor atual não pode ultrapassar o valor-alvo da meta.
- **RN20 — Propriedade da meta:** somente o dono da meta pode editá-la ou registrar seu progresso.
