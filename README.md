# TTP-FS

## Table of Contents

- [Deployment](#deployment)
- [Dependencies Used](#depUsed)
- [Running The Project](#runningProject)
- [Restrictions](#restrictions)
- [Description](#description)
- [Endpoints (for frontend usage)](#frontend)
  - [api/auth](#authEndpoints)
  - [api/transactions](#transactionsEndpoints)
  - [api/users](#usersEndpoints)
- [Table Schema](#tableSchema)

# Deployment <a name="deployment"></a>

- [Frontend Deployment](https://vgxtrading.netlify.com/)

# Dependencies Used <a name="depUsed"></a>

## Backend

- Node
- Express
- PostgreSQL
- Knex
- Knex Cleaner
- Bcryptjs
- Jsonwebtoken
- Cors
- Helmet
- Dotenv
- Nodemon (Development)

## Frontend

- React
- React-DOM
- React-Router-DOM
- React-Scripts
- Redux
- React-Redux
- Redux Logger
- Redux Thunk
- Node-Sass
- Axios
- Material UI

# Running The Project <a name="runningProject"></a>

If you would like to run this project locally, `cd` into the repository and run `yarn`. This will install the needed dependencies. Next you can run either `yarn start` to run the server using node or `yarn server` to run the server using nodemon. The purpose of using nodemon is to restart the server any time you make a change and save. **IMPORTANT** If you plan on running the Frontend client locally, please remember to run the server locally as well. Create a `.env` file in the root directory, and set the SECRET and PORT as desired. Running the API's database locally requires either a local PostgreSQL database OR credentials to an RDS database. Once connected, run the command `yarn knex migrate:latest` to run migrations. The API is now good to go. For the Frontend, create a `.env` file in the `/ttp-fs` directory, and set `REACT_APP_BACKENDPOINT` to the URL of your local API, which is most likely `http://localhost:4000` (or if you set the PORT to something like 5000, it will be `http://localhost:5000`). React loads in `.env` variables while compiling, so they must be set before running the app! Finally, simply run `yarn` within the `/ttp-fs` directory, in order to install the needed dependencies. Your local client is now ready to go. Just run `yarn start`.

Alternatively, the Frontend can be accessed via its Netlify deployment above. Here are the `.env` variables I used for local development, including the credentials to a development RDS database (this will work locally for anybody, as long as they are connected to the internet). These variables can be freely copy pasted into a `.env` file.

```
PORT=5000
SECRET=KEEP IT SECRET, KEEP IT SALTY
DB_DEV_HOST=ttpbackend-dev.crcnneyou5yk.us-east-1.rds.amazonaws.com
DB_DEV_DATABASE=ttpbackenddev
DB_DEV_USER=victorgoico
DB_DEV_PASSWORD=ttpbackend2019
DB_DEV_PORT=5432
```

Running `yarn knex migrate:latest` is not necessary if using these credentials, because the database is already created.

For the `.env` of the Frontend, the variables should look like this

```
REACT_APP_BACKENDPOINT=http://localhost:4000
```

# Restrictions <a name="restrictions"></a>

If you would like to make a request to the users endpoint, a valid **JSON web token** is required in your request headers.authorization. For transactions, making a **GET** request does not require a **JSON web token**, but **POST, DEL,** and **PUT** requests do.

*** **DISCLAIMER** *** Due to the limitations of the IEX API, buying stock is not possible then the `/tops` endpoint is down. This happens regularly on the weekends, as well as very late at night. Selling should work fine all the time, however.

# Description <a name="description"></a>

This project is a trading app powered by the IEX API. The Backend is a REST API built using Node and Express. User registration, login, and fetching or making transactions are handled here. The Backend was deployed using `Elastic Beanstalk`. Below you will find instructions on how to make requests to the API, as well as the data schema for the database migrations. The Frontend client is a SPA built using React. The Frontend was deployed using `Netlify`.

## Backend

- The server is run using Node.
- Express is a minimalist Node web application framework for building APIs.
- PostgreSQL is the database used for production. I used Amazon's `Relational Database Service` for generating development and production PostgreSQL databases.
- Knex is a SQL query builder for JavaScript.
- Knex Cleaner is a Knex dependency for cleaning up seed data.
- Jsonwebtoken is used for authenticating users.
- Bcrypt is used for hashing passwords.
- Helmet adds a base layer of security by hiding basic info about the API when interacting with it.
- Dotenv allows the API to interact with environment variables.
- Cors is a dependency used to allow Cross Origin Resource Sharing. This allows the Frontend client to interact with the Backend.

## Frontend

- React is a JavaScript library for creating User Interfaces.
- React-Router-DOM allows for easy handling of routes.
- Redux is a state-management tool.
- React-Redux allows Redux to be used with React.
- Redux Logger will log every action that as it is dispatched.
- Redux Thunk allows the use of more complex, asynchronous action creators.
- Node-Sass is a library that allows React components to be styled using SASS.
- Axios is a library for making HTTP requests.
- Material UI is a component library.

# Endpoints (for frontend usage) <a name="frontend"></a>

# api/auth <a name="authEndpoints"></a>

---

#### POST `/api/auth/login`

##### Required (unless marked optional):

**Header**: default
**URL Params**: none
**Body**:
email: string, up to 50 characters
password: string, up to 100 characters

##### Example Request:

```
Header: default
URL Params: none
Body:
{
    email: 'name@email.com',
    password: 'abc123'
}
```

##### Example Response:

```
{
    "message": "Welcome mandy123!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userID": 10
}
```

---

#### POST `/api/auth/register`

##### Required (unless marked optional):

**Header**: default
**URL Params**: none
**Body**:
name: string, up to 50 characters
email: string, up to 50 characters
password: string, up to 100 characters

##### Example Request:

```
Header: default
URL Params: none
Body:
{
    name: Cooper
    email: 'name@email.com',
    password: '123abc'
}
```

##### Example Response:

```
{
    "message": "Welcome name@email.com!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userID": 11
}
```

---

# api/transactions <a name="transactionsEndpoints"></a>

---

#### GET `/api/transactions`

##### Example Request:

```
Header: default
URL Params: none
Body: none
```

##### Example Response:

```
[
    {
        "id": 5,
        "user_id": 1,
        "symbol": "SNAP",
        "sector": "mediaentertainment",
        "security_type": "commonstock",
        "price": 14.355,
        "quantity": 20
    },
    {
        "id": 6,
        "user_id": 1,
        "symbol": "SNAP",
        "sector": "mediaentertainment",
        "security_type": "commonstock",
        "price": 14.355,
        "quantity": 20
    },
    {
        "id": 7,
        "user_id": 1,
        "symbol": "UBER",
        "sector": "transportation",
        "security_type": "commonstock",
        "price": 44.295,
        "quantity": 5
    },
    {
        "id": 8,
        "user_id": 1,
        "symbol": "UBER",
        "sector": "transportation",
        "security_type": "commonstock",
        "price": 44.295,
    }
]
```

---

#### GET `/api/transactions/:id`

##### Required:

**Header**: default

**URL Params**: ID of post

**Body**: none

##### Example Request:

```
Header: default
URL Params: 16
Body: none
```

##### Example Response:

```
{
    "id": 16,
    "user_id": 1,
    "symbol": "FB",
    "sector": "mediaentertainment",
    "security_type": "commonstock",
    "price": 194.96,
    "quantity": 2
}
```

---

#### POST `/api/transactions`

##### Required:

**Header**: JSON web token

**URL Params**: none

**Body**:

- user_id: integer, required (FK referring to PK of users table. Who is making the post?)
- symbol: string, up to 10 characters, required
- sector: string, up to 30 characters, required
- security_type: string, up to 30 characters, required
- price: float, refers to price of stock purchased, required
- quantity: integer, refers to quantity of stock purchased, required

##### Example Request:

```
Header:
{
    Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
URL Params: none
Body:
{
	"user_id": "1",
	"symbol": "SNAP",
	"sector": "mediaentertainment",
	"security_type": "commonstock",
	"price": 14.355,
	"quantity": 20
}
```

##### Example Response:

```
{
    "id": 6,
    "user_id": 1,
    "symbol": "SNAP",
    "sector": "mediaentertainment",
    "security_type": "commonstock",
    "price": 14.355,
    "quantity": 20
    }
```

---

# api/users <a name="usersEndpoints"></a>

---

#### GET `/api/users/:id`

##### Required (unless marked optional):

**Header**: JSON web token

**URL Params**: ID of user

**Body**: none

##### Example Request:

```
Header: {
    Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
URL Params: 1
Body: none
```

##### Example Response:

```
{
    "id": 1,
    "email": "victor@email.com",
    "name": "Victor Goico",
    "password": "$2a$08$q9IyNCtbG0d3ihFoXgVAAOeQxhSdA3tpb9X9Y1dAi5nuIzYV1OlLO",
    "balance": 2935.4,
    "created_at": "2019-07-01T19:19:12.203Z",
    "updated_at": "2019-07-01T19:19:12.203Z"
}
```

---

#### GET `/api/users/:id/transactions`

##### Required (unless marked optional):

**Header**: JSON web token

**URL Params**: ID of user

**Body**: none

##### Example Request:

```
Header: {
    Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
URL Params: 1
Body: none
```

##### Example Response:

```
[
    {
        "id": 16,
        "user_id": 1,
        "symbol": "FB",
        "sector": "mediaentertainment",
        "security_type": "commonstock",
        "price": 194.96,
        "quantity": 2
    },
    {
        "id": 17,
        "user_id": 1,
        "symbol": "ETH",
        "sector": "consumerdurablesapparel",
        "security_type": "commonstock",
        "price": 21.08,
        "quantity": 2
    },
    {
        "id": 18,
        "user_id": 1,
        "symbol": "GRUB",
        "sector": "retailing",
        "security_type": "commonstock",
        "price": 75.86,
        "quantity": 1
    }
]
```

---

#### PUT `/api/users/:id`

##### Required (unless marked optional):

**Header**: JSON web token

**URL Params**: ID of profile

**Body**: Field that you are editing (username, password, or thumbnailUrl)

##### Example Request:

```
Header: {
    Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
URL Params: 1
Body:
{
    "email": "victor@gmail.com"
}
```

##### Example Response:

```
{
    "id": 1,
    "email": "victor@gmail.com",
    "name": "Victor Goico",
    "password": "$2a$08$q9IyNCtbG0d3ihFoXgVAAOeQxhSdA3tpb9X9Y1dAi5nuIzYV1OlLO",
    "balance": 2935.4,
    "created_at": "2019-07-01T19:19:12.203Z",
    "updated_at": "2019-07-01T19:19:12.203Z"
}
```

#### DEL `/api/users/:id`

##### Required (unless marked optional):

**Header**: JSON web token

**URL Params**: ID of profile

**Body**: none

##### Example Request:

```
Header: {
    Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
URL Params: 1
Body: none
```

##### Example Response:

```
{
    "id": 1,
    "email": "victor@gmail.com",
    "name": "Victor Goico",
    "password": "$2a$08$q9IyNCtbG0d3ihFoXgVAAOeQxhSdA3tpb9X9Y1dAi5nuIzYV1OlLO",
    "balance": 2935.4,
    "created_at": "2019-07-01T19:19:12.203Z",
    "updated_at": "2019-07-01T19:19:12.203Z"
}
```

---

# Table Schema <a name="tableSchema"></a>

### users

| Field      | Data Type | Modifiers                                  |
| ---------- | --------- | ------------------------------------------ |
| id         | integer   | PK, auto-increment                         |
| name       | string    | required, limited to 50 characters         |
| email      | string    | required, unique, limited to 50 characters |
| password   | string    | optional, limited to 256 characters        |
| balance    | float     | auto-assigned to \$5000.00 for new users   |
| created_at | date      | auto-generated                             |
| updated_at | date      | auto-generated                             |

### transactions

| Field         | Data Type | Modifiers                                   |
| ------------- | --------- | ------------------------------------------- |
| id            | integer   | PK, auto-increment                          |
| user_id       | integer   | required, FK referring to PK of users table |
| symbol        | string    | required, limited to 10 characters          |
| sector        | string    | required, limited to 30 characters          |
| security_type | string    | required, limited to 30 characters          |
| quantity      | integer   | required, refers to the quantity of stock   |
| price         | float     | required, refers to the price of the stock  |
