# CityFarm Backend Application

CityFarm is a platform that encourages urban dwellers to participate in agriculture effortlessly and in their convenient time. Different professions such as retirees, bankers, and lawyers can rent out a space in a greenhouse farm, book a space or plot, and plant on it. They can monitor their plants remotely and the application also connects them to local markets where they can sell their produce.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Endpoints](#endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and authorization
- Booking and renting greenhouse spaces
- Remote monitoring of plants
- Connection to local markets
- Comprehensive user profiles
- JWT-based authentication
- Email validation for unique users

## Technologies

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Passport](http://www.passportjs.org/)
- [JWT](https://jwt.io/)
- [Docker](https://www.docker.com/)
- [ConfigModule](https://docs.nestjs.com/techniques/configuration)

## Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/cityfarm-backend.git
cd cityfarm-backend
```

2. Install dependencies

```bash
npm install
```

3. Setup PostgreSQL

Ensure you have PostgreSQL installed and running. Create a database for the application.

## Running the Application

1. Start the application

```bash
npm run start
```

2. For development mode

```bash
npm run start:dev
```

3. For production mode

```bash
npm run start:prod
```

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
POSTGRES_HOST=your_postgres_host
POSTGRES_PORT=your_postgres_port
POSTGRES_USER=your_postgres_user
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DB=your_postgres_db
JWT_SECRET=your_jwt_secret
```

## Endpoints

### Auth

- `POST /auth/signup`: Sign up a new user
- `POST /auth/signin`: Sign in an existing user

### User

- `GET /users/profile`: Get user profile
- `PUT /users/profile`: Update user profile

### Greenhouse

- `GET /greenhouses`: Get all greenhouses
- `POST /greenhouses/book`: Book a space in a greenhouse

### Monitoring

- `GET /monitoring`: Get monitoring data for a user's plants

### Market

- `GET /market`: Get market data
- `POST /market/sell`: Post produce for sale

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Create a new Pull Request


