# 🌱 Ecofood API

API RESTful desenvolvida com NestJS para conectar restaurantes doadores a entidades coletoras, combatendo o desperdício de alimentos através de geolocalização.

## 🚀 Tecnologias

- **NodeJS & NestJS** (Framework Backend)
- **MongoDB & Mongoose** (Database & GeoSpatial Queries)
- **Passport JWT** (Autenticação Segura)
- **Docker** (Containerização do Banco)
- **Swagger** (Documentação Automática)

## ⚙️ Instalação e Execução

### Pré-requisitos

- Node.js v18+
- Docker e Docker Compose

### Passo a passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/ecofood-api.git
   cd ecofood-api
   ```

2. **Configure as Variáveis de Ambiente**
   Crie um arquivo \`.env\` na raiz baseado no exemplo:
   ```env
   MONGO_URI=mongodb://root:example@localhost:27017/ecofood?authSource=admin
   JWT_SECRET=sua_chave_super_secreta
   ```

3. **Suba o Banco de Dados**
   ```bash
   docker-compose up -d
   ```

4. **Instale as dependências e rode**
   ```bash
   npm install
   npm run start:dev
   ```

5. **Acesse a Documentação**
   Abra seu navegador em: `http://localhost:3000/api/docs`

## 📍 Funcionalidades Principais

- **Auth:** Registro e Login com distinção de perfis (Doador/Coletor).
- **Geo-Busca:** O endpoint `/donations/nearby` utiliza índices `2dsphere` do MongoDB para encontrar doações dentro de um raio (km) específico.
- **Race Condition Handling:** O sistema de reservas utiliza operações atômicas (`findOneAndUpdate`) para impedir que dois usuários reservem o mesmo item simultaneamente.
- **Cron Jobs:** Tarefa agendada para expirar automaticamente doações vencidas.

## 🧪 Testes

Exporte a collection do Insomnia localizada na pasta `/docs` ou utilize o Swagger UI.
