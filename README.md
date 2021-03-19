# WeShop-Back

## Como rodar o projeto?

1. Instale o NodeJS [https://nodejs.org/en/](https://nodejs.org/en/)
2. Instale o Yarn [https://yarnpkg.com/](https://yarnpkg.com/)
3. Instale o Postgres 13 [https://www.postgresql.org/](https://www.postgresql.org/)
4. Crie uma nova database

  ```bash
  $ psql
  $ CREATE DATABASE minha_nova_database;
  ```

5. Clone o projeto
6. Crie o arquivo .env a partir do arquivo .env.example e preencha os valores com a url para a database criada('postgres://usuario:senha@host:port/database')  e a porta 3000.
7. Instale as dependências

  ```bash
  yarn
  ```

8. Rode as migrations

  ```bash
  yarn migrations
  ```

9. Rode as seeders

  ```bash
  yarn seeds
  ```

10. Rode a aplicação 🙂

  ```bash
  yarn dev
  ```
