# Minha API de Gerenciamento de Tarefas

Uma API para gerenciamento de tarefas, permitindo que usuários criem, visualizem, atualizem, e excluam tarefas. Inclui funcionalidades de autenticação de usuários, logout, e consulta dos dados do usuário autenticado.

## Índice
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Endpoints](#endpoints)
- [Testes](#testes)
- [Licença](#licença)

## Funcionalidades
- Registro de usuários e login
- Autenticação JWT
- Logout com blacklist de tokens
- CRUD completo de tarefas:
  - Adicionar tarefas
  - Listar tarefas
  - Atualizar tarefas
  - Excluir tarefas
  - Marcar tarefas como completas
- Consulta de dados do usuário autenticado

## Tecnologias Utilizadas
- **Node.js**
- **Express**
- **Sequelize** para ORM e manipulação de banco de dados
- **JWT** para autenticação
- **MySQL** como banco de dados
- **Jest** para testes (opcional, se você implementou)

## Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/sua-api.git
   cd sua-api

2. Instale as dependências:
   ```bash
   npm install


## 2. Configuração do Banco de Dados
1. **Crie um banco de dados MySQL** para o projeto.
2. **Atualize o arquivo `.env`** com as credenciais de banco de dados e outras variáveis de ambiente.

## 3. Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto e defina as variáveis conforme abaixo:

```plaintext
PORT=3000
DB_HOSTNAME=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco_de_dados
PORT: Porta na qual a API será executada.
DB_HOSTNAME: Endereço do servidor do banco de dados.
DB_USER: Usuário do banco de dados.
DB_PASSWORD: Senha do banco de dados.
DB_NAME: Nome do banco de dados.

4. Migrar o Banco de Dados
Execute as migrações do Sequelize para criar as tabelas necessárias no banco de dados:

npx sequelize db:migrate

5. Executar a API
Para iniciar o servidor de desenvolvimento, utilize o seguinte comando:

npm start

## **Endpoints**

## **Autenticação**

### **POST /api/auth/register**

- **Descrição**: Cria um novo usuário.
- **Parâmetros**:
  ```json
  {
    "username": "exemplo",
    "password": "senha123"
  }
Resposta de Sucesso:
Status: 201 Created
json
Copiar código
{
  "message": "Usuário criado com sucesso!"
}
POST /api/auth/login
Descrição: Realiza o login de um usuário e gera um token JWT.
Parâmetros:
json
Copiar código
{
  "username": "exemplo",
  "password": "senha123"
}
Resposta de Sucesso:
Status: 200 OK
json
Copiar código
{
  "token": "seu_jwt_token_aqui"
}
POST /api/auth/logout
Descrição: Realiza o logout do usuário, invalidando o token JWT.
Resposta de Sucesso:
Status: 200 OK
json
Copiar código
{
  "message": "Logout realizado com sucesso."
}
Tarefas
POST /api/task
Descrição: Cria uma nova tarefa.
Parâmetros:
json
Copiar código
{
  "title": "Comprar pão",
  "description": "Ir até o mercado e comprar pão"
}
Resposta de Sucesso:
Status: 201 Created
json
Copiar código
{
  "id": 1,
  "title": "Comprar pão",
  "description": "Ir até o mercado e comprar pão",
  "completed": false
}
GET /api/task
Descrição: Retorna todas as tarefas do usuário autenticado.
Resposta de Sucesso:
Status: 200 OK
json
Copiar código
[
  {
    "id": 1,
    "title": "Comprar pão",
    "description": "Ir até o mercado e comprar pão",
    "completed": false
  },
  {
    "id": 2,
    "title": "Estudar programação",
    "description": "Estudar JavaScript e Node.js",
    "completed": true
  }
]
GET /api/task/
Descrição: Retorna uma tarefa específica pelo id.
Parâmetros:
id: ID da tarefa.
Resposta de Sucesso:
Status: 200 OK
json
Copiar código
{
  "id": 1,
  "title": "Comprar pão",
  "description": "Ir até o mercado e comprar pão",
  "completed": false
}
PUT /api/task/
Descrição: Atualiza os dados de uma tarefa existente.
Parâmetros:
id: ID da tarefa a ser atualizada.
json
Copiar código
{
  "title": "Comprar pão e leite",
  "description": "Ir ao mercado e comprar pão e leite"
}
Resposta de Sucesso:
Status: 200 OK
json
Copiar código
{
  "message": "Tarefa atualizada com sucesso."
}
DELETE /api/task/
Descrição: Exclui uma tarefa existente.
Parâmetros:
id: ID da tarefa a ser excluída.
Resposta de Sucesso:
Status: 200 OK
json
Copiar código
{
  "message": "Tarefa excluída com sucesso."
}
PUT /api/task/
/completed
Descrição: Marca uma tarefa como concluída.
Parâmetros:
id: ID da tarefa a ser atualizada.
Resposta de Sucesso:
Status: 200 OK
json
Copiar código
{
  "message": "Tarefa marcada como concluída."
}
Usuário
GET /api/user
Descrição: Retorna os dados do usuário autenticado.
Resposta de Sucesso:
Status: 200 OK
json
Copiar código
{
  "id": 1,
  "username": "exemplo",
  "email": "exemplo@email.com"
}
