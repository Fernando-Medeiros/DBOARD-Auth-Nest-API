# PRISMA CLI

> -   Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started

> -   Set the provider of the datasource block in schema.prisma to match your database:**_ postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb._**

```sh
## Create prima schema
npx prisma init

# Turn your database schema into a Prisma schema.
npx  prisma db pull

#Generate the Prisma Client. You can then start querying your database.
npx  prisma generate
```
