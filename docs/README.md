# Dashboard-Auth-Backend-RestAPI

![Node](https://img.shields.io/badge/Node.JS-white?style=for-the-badge&logo=node.js&logoColor=black)
![Nest](https://img.shields.io/badge/Nest.JS-white?style=for-the-badge&logo=nestjs&logoColor=black)
![Jest](https://img.shields.io/badge/Jest-white?style=for-the-badge&logo=jest&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-white?style=for-the-badge&logo=TypeScript&logoColor=black)
![Prisma](https://img.shields.io/badge/Prisma-white?style=for-the-badge&logo=prisma&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-white?style=for-the-badge&logo=Docker&logoColor=black)
![Postgres](https://img.shields.io/badge/Postgres-white?style=for-the-badge&logo=postgresql&logoColor=black)
![Swagger](https://img.shields.io/badge/Swagger-white?style=for-the-badge&logo=swagger&logoColor=black)

## Dependências

| Ferramenta / Pacote |    Versão     | Opcional |
| :------------------ | :-----------: | :------: |
| Docker Desktop      |      ^4       |          |
| Docker Compose      |      ^2       |    x     |
| VsCode              |     ^1.8      |    x     |
| Node                |      ^18      |          |
| Yarn ou Npm         | ^1.22 ou ^9.8 |          |

## Funcionalidades

| route     |     get     |        post        |       patch       |   delete   |
| :-------- | :---------: | :----------------: | :---------------: | :--------: |
| auth      |             | [ token, refresh ] |                   |            |
| customers | [ findOne ] |    [ register ]    |    [ update ]     | [ remove ] |
| passwords |             |    [ recover ]     | [ update, reset ] |            |

## Instalação

Copie o template do env para .env

```sh
cp env-example .env
```

Instale as dependências do [package.json](../package.json)

```sh
yarn install && yarn build
```

## Variáveis de ambiente

```sh
PORT=3000
NODE_ENV=dev

DATABASE_URL="postgresql://postgres:docker@localhost:5432/DEVELOPMENT?schema=public"

CORS_ORIGIN=http://localhost:5173
URL_RESET_PASSWORD=http://localhost:5173/password/reset

RATE_LIMITER_MAX_REQUEST=100
RATE_LIMITER_DURATION=10 # Set Minutes

JWT_SECRET=001001001001
JWT_EXPIRATION=3h
JWT_EXPIRATION_RECOVER=5m
ENCRYPT_JWT_SECRET=1001001001001

NODEMAILER_USER=example@email.com
NODEMAILER_PASS=password
NODEMAILER_HOST=smtp.gmail.com
NODEMAILER_PORT=465
```

## Docker

```sh
# Para subir o container
docker compose up -d
```

## Prisma

```sh
yarn prisma generate # atualizar o prisma.schema
yarn prisma db push # subir o schema para o banco de dados
yarn prisma studio # visualizar os dados
```

## Servidor

```sh
yarn start # production  - [node dist/src/main]
yarn start:dev # watch  - [nest start --watch]
```

[http://localhost:3000/](http://localhost:3000/)

## Testes

```sh
yarn test # unit tests
yarn test:e2e # e2e tests
```

## Licença

Nest is [MIT licensed](LICENSE).

## Endpoints

![endpoints](endpoints.png)
![schemas](schemas.png)
