## Hosted Project

[Demo-Wallet-App](https://moviestore-app.onrender.com)

### User Story

- This is a basic Wallet Service that allows users to perform various financial transactions. The application is built with Node.js, TypeScript, and MySQL using the Knex.js library for database interactions.

#### Setup Basic Express Server

### Technologies Used
- Node.js
- TypeScript
- Express.js
- MySQL
- Knex.js

### Getting Started
### Prerequisites
- Node.js installed on your machine
- MySQL database server running locally or accessible remotely
- A code editor (e.g., Visual Studio Code)
- Install necessary node packages
- Install Knex and Database Driver:
- Make sure you have Knex and the appropriate database driver installed. 
- Create source folders,migrations, seeds and the necessary folders needed for the project
- Create a knexfile.ts in the root directory of your project. This file should contain the database connection configurations for different environments (e.g., development, production).
- In the knexfile.ts file, you'll define the configuration for different environments (e.g., development, production).

### Configuration
- Create a .env file in the root directory:
- Make sure that your environment variables (e.g., NODE_ENV) are set correctly. This can affect which configuration Knex uses.
- Update the placeholders with your actual database and token secret values.

### Project Structure
- src/ - Contains the source code of the application.
        controllers/ - Contains the controller functions for handling various routes.
        db/ - Contains the database connection configuration.
        entities/ - Contains the entity classes representing database tables.
        middleware/ - Contains the authentication middleware.
        routes/ - Defines the application routes.
        utils/ - Contains utility functions.
        index.ts - Entry point of the application.
    migrations/ - Contains database migration files.
    seeds/ - Contains seed data for the database.

### Utils
- Create jwt.ts,validation.ts (To validate user)

### Middleware
- Create AuthToken.ts to authenticate user

### Controllers
- Create the necessary controllers

### API Endpoints
- Auth
-   POST /api/signup - Register a new user.
-   POST /api/login - Log in an existing user.

- User
-   GET /api/user/allUsers - Get all Users.
-   GET /api/user/:id - Get single user.

- Accounts
-   POST /api/account/ - Create a new account.
-   GET /api/account/ - Retrieve all accounts.
-   GET /api/account/:id - Retrieve an account by ID.
    
- Wallets
-   POST /api/wallet/ - Perform a financial transaction (Deposit, Withdrawal, Transfer).
-   GET /api/wallet/ - Retrieve all wallets.
-   GET /api/wallet/:id - Retrieve a wallet by ID.

### Test the Application
- Run your Node.js application and test the endpoints to ensure everything is working as expected.

### Postman Link


### Entity Relationship Diagram(ERD)

  +------------------+       +---------------------+      +-------------------+
  |       User       |       |       Account       |      |       Wallet      |
  +------------------+       +---------------------+      +-------------------+
  | id (PK)          |<----->| id (PK)             |      | id (PK)           |
  | fullname         |       | accName             |      | amount            |
  | email            |       | bankAccount         |      | transactionType   |
  | password         |       | accBalance          |      | senderAccountId (FK)|
  +------------------+       | senderAccountId (FK)|      | receiverAccountId (FK)|
                             | receiverAccountId (FK) |  +-------------------+
                             +---------------------+


### Explanation of the relationships:

- A User can have multiple Accounts, but each Account belongs to only one User. This is represented by the one-to-many relationship between User and Account (denoted by the arrow).

- Each Account can have multiple Wallets, but each Wallet belongs to only one Account. This is represented by the one-to-many relationship between Account and Wallet.

- The id fields represent the primary keys for each entity.

- The user_id field in the Account entity is a foreign key referencing the id of the associated User.

- The account_id field in the Wallet entity is a foreign key referencing the id of the associated Account.

- This ERD illustrates how the entities are related in the database schema. Each entity has its own set of attributes (not all attributes are shown in the diagram for simplicity).