# BackEnd Challege NgCash

----------

# Getting started

## Stack Required

 - Node
 - Typescript
 - PrismaORM
 - Docker

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

The api aims to simulate a transfer system for duly registered users. Then we have all the routes of its functionality:

#### Users

    POST /users

Creates a new user in the database, which must have at least 3 letters in the user name and password with at least 8 digits, with (1) uppercase letter, (1) lowercase letter, and (1) number.

        Body:
        {
            "username": "john",
            "password": "pAsSw0rd"
        }

----------

    POST/user/sign

The registered user can access his account, through a username and a valid password of (8) digits. And an access token is generated, with 24 hours to expire.

        Body:
        {
            "username": "john",
            "password": "pAsSw0rd"
        }

#### Accounts

    GET /Accounts

The only objective is to search for the balances of each created account. These balances are by default worth 100 BRL. To access your balance, the user must have a valid token.

    Headers:

    {
        "Authorization": "Bearer [Token]",
        "Content-Type:" "application/json"
    }


You must pass the header in your request.

#### Transactions

    POST / Transactions

In these routes, we have the general objective of the project. Which is to be able to make transfers between registered users, and with a valid token. For that, you need the access token of the user that you are going to transfer, in our header. And in turn, the username and accountId of the user who will receive, then the amount to be deposited.
 
    Headers:
    {
        "Authorization": "Bearer [Token]",
        "Content-Type:" "application/json"
    }


    {
        "creditedAccount": "f9a67802-8f3b-4008-b3af-4f4d5f113eb4",
        "username": "john",
        "value": 2000
    }

----------
    GET /transactions/index

In this route, we were able to search for transfers by individual users. Categorized by transfers sent and received. And you need a valid token!


    {
        "Authorization": "Bearer [Token]",
        "Content-Type:" "application/json"
        }


An implementation in this route is the search for transactions by date. Just pass the date through the query, and its value in the generated timestamp.
        {
            "date": "2022-11-20T04:04:11.769Z"
        }
----------

## Start application

- `npm run dev`

----------

# Authentication
 
This applications uses JSON Web Token (JWT) to handle authentication. The token is passed with each request using the `Authorization` header with `Token` scheme. The JWT authentication middleware handles the validation and authentication of the token. Please check the following sources to learn more about JWT.

----------
 
# Swagger API docs Route

As it is under development, it does not have the online link of the swagger documentation. When you start the server, you can pick up, and even test with the documentation, which is on the route:

    Example:
    http://localhost:3000/docs/
