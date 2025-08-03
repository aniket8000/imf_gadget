# IMF Gadget API – Backend Developer
This project is a secure, RESTful API built for managing IMF gadgets. It includes full CRUD functionality, self-destruct simulation, JWT-based authentication, filtering, and soft deletion — all powered by Node.js, Express, Prisma, and PostgreSQL.

## Features
- User authentication using JWT (register/login)
- Add, update, soft-delete, and view gadgets
- Random codename generation for new gadgets
- Random "mission success probability" on retrieval
- Self-destruct endpoint (confirmation code simulation)
- Filter gadgets by status using query param
- PostgreSQL database managed via Prisma ORM
- Swagger documentation and live API deployment

## Tech Stack
- Node.js + Express.js
- PostgreSQL + Prisma ORM
- TypeScript
- JWT Authentication
- Swagger (API documentation)
- Railway (deployment)

## Setup Instructions
1. Clone the repository:


git clone https://github.com/aniket8000/imf-gadget-api.git
cd imf-gadget-api

2. Install dependencies:

npm install

3. Create a .env file with the following:

DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret
PORT=4000

4. Apply migrations and generate Prisma client:

npx prisma migrate dev --name init
npx prisma generate

5. Start the server

npx ts-node-dev src/index.ts


## The API is documented and testable via Swagger UI:

Available locally at http://localhost:4000/api/docs

(Please run the project locally to access documentation)



