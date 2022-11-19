# BackEnd Challege NgCash

----------

# Getting started

## Installation

Clone the repository

    git clone https://github.com/EmmanoelDan/Back-End-NgCash.git
    
Install dependencies
    
    npm install
    
----------

## Database

Implements Prisma with a postgreSQL database.

----------
##### Docker

To start prism settings, you must set up a "docker compose" file. If you start docker compose, you must have installed docker on the machine.

Starde docker-compose command
      
      docker-compose up
      
So he already creates a container with my postgres bank.

----------

##### Prisma

----------

Copy prisma config example file for database settings

    .env

Set mysql database settings in prisma/.env

    DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"

To create all tables in the new database make the database migration from the prisma schema defined in prisma/schema.prisma

    npx prisma migrate dev

Now generate the prisma client from the migrated database with the following command

    npx prisma generate

The database tables are now set up and the prisma client is generated. For more information see the docs:

- https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project-typescript-mysql


----------

## NPM scripts

- `npm run dev` - Start application
----------

## API Specification

----------

## Start application

- `npm run dev`

----------

# Authentication
 
This applications uses JSON Web Token (JWT) to handle authentication. The token is passed with each request using the `Authorization` header with `Token` scheme. The JWT authentication middleware handles the validation and authentication of the token. Please check the following sources to learn more about JWT.

----------
 
# Swagger API docs

   
