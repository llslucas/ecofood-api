### 📅 Dia 1: Setup, Infraestrutura e Database

Foco: Levantar o ambiente e garantir que o banco esteja pronto para dados espaciais.

- [x] Inicializar Projeto: Criar projeto com nest new ecofood-api.
- [x] Docker: Criar um docker-compose.yml para subir o MongoDB e o Redis (para o futuro BullMQ).
- [x] Conexão DB: Configurar o MongooseModule (NestJS) para conectar ao Mongo.
- [x] Estrutura de Pastas: Definir a arquitetura base (Modules/Controllers/Services) para Auth e Donations.
- [x] Git: git init, .gitignore e primeiro commit.

### 📅 Dia 2: Autenticação e Perfis (Auth Module)

Foco: Segurança e distinção entre quem doa e quem recebe.

- [x] Schema User: Criar Schema do Mongoose para Usuário (email, senha com bcrypt, role: 'DOADOR' | 'COLETOR').
- [x] JWT Setup: Implementar Passport-JWT e estratégia local.
- [x] Endpoints:
  - [x] POST /auth/register: Criar usuário.
  - [x] POST /auth/login: Retornar o Token JWT.
- [x] Validation Pipeline: Criar um Pipeline global para validar conteúdo de requisições.
- [x] Guards: Criar um Guard global ou por rota para proteger endpoints (Ex: @UseGuards(JwtAuthGuard)).

### 📅 Dia 3: CRUD de Doações (Core Domain)

Foco: O doador precisa conseguir colocar o alimento no sistema.

- [x] Schema Donation: Criar Schema (titulo, qtd, validade, status: 'DISPONIVEL').
  - [x] Incluir campo location do tipo Point (GeoJSON).
- [x] DTOs: Criar DTOs para validação de entrada (usando class-validator).
- [x] Create Endpoint: POST /donations (Apenas para perfil 'DOADOR').
- [x] Pegar o ID do usuário logado via Request (JWT) e vincular à doação.
- [x] List Own: GET /donations/me (Listar o que eu doei).

### 📅 Dia 4: Geolocalização e Busca Espacial

Foco: Usar o poder do MongoDB para encontrar comida perto.

- [x] Indexação: Criar índice 2dsphere no campo location do Schema Donation (Crucial para performance).
- [x] Endpoint de Busca: GET /donations/nearby. (Recebe: lat, long e raio (km) via Query Params.)
- [x] Query Mongo: Implementar o operador $near ou $geoWithin no Service.
- [x] Filtro: Garantir que só retorne itens com status 'DISPONIVEL'.

### 📅 Dia 5: Sistema de Reserva e Concorrência

Foco: Garantir que duas pessoas não peguem a mesma doação.

- [x] Endpoint Reserva: PATCH /donations/:id/reserve (Apenas perfil 'COLETOR').
- [x] Lógica Atômica: Usar findOneAndUpdate do Mongoose.
- [x] Query: \_id: id AND status: 'DISPONIVEL'.
- [x] Update: status: 'RESERVADO', collectedBy: userId.
- [x] Isso previne "Race Condition" (condição de corrida).
- [x] Validação: Retornar erro 409 (Conflict) se o item já foi levado.

### 📅 Dia 6: Background Jobs (Validade) e Refinamento

Foco: Limpeza automática e qualidade de código.

- [x] Cron Job: Configurar @nestjs/schedule.
- [x] Tarefa: Rodar todo dia à 00:00.
- [x] Lógica: Buscar itens onde validade < now E status == 'DISPONIVEL'.
- [x] Ação: Atualizar status para 'EXPIRADO'.
- [ ] Tratamento de Erros: Criar um ExceptionFilter global para formatar erros de forma amigável.
- [ ] Seed Data: Criar um script simples para popular o banco com doações em lat/longs próximas para testar.

### 📅 Dia 7: Documentação e Teste Final

Foco: Entregar algo profissional.

- [ ] Swagger: Configurar o @nestjs/swagger (NestJS faz isso quase sozinho com Decorators).
- [ ] Insomnia: Exportar a collection para facilitar o teste.
- [ ] README: Escrever como rodar o projeto (Docker command, env vars).
- [ ] Demo: Gravar um GIF ou vídeo curto simulando o fluxo: Cadastro -> Postagem -> Busca (mostrando a distância) -> Reserva.
