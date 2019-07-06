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

- Node
- Express
- PostgreSQL (Production)
- Knex
- Knex Cleaner
- Bcryptjs
- Jsonwebtoken
- Cors
- Helmet
- Dotenv
- Nodemon (Development)

# Running The Project <a name="runningProject"></a>

If you would like to run this project locally, `cd` into the repository and run `yarn`. This will install the needed dependencies. Next you can run either `yarn start` to run the server using node or `yarn server` to run the server using nodemon. The purpose of using nodemon is to restart the server any time you make a change and save.

# Restrictions <a name="restrictions"></a>

If you would like to make a request to the users endpoint, a valid **JSON web token** is required in your request headers.authorization. For transactions, making a **GET** request does not require a **JSON web token**, but **POST, DEL,** and **PUT** requests do.

# Description <a name="description"></a>

This project is a RESTful API built using Node and Express. The purpose of this project is to provide a Backend for the TTP-FS Frontend client. User registration, login, and fetching or making transactions are handled here. This project was deployed using `Elastic Beanstalk`. The `README.md` for the Frontend client is located inside the /ttp-fs directory. Below you will find instructions on how to make requests to the API, as well as the data schema for the database migrations.

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

# Endpoints (for frontend usage) <a name="frontend"></a>

# api/auth <a name="authEndpoints"></a>

---

#### POST `/auth/login`

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

#### POST `/auth/register`

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
