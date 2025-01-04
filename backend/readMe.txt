# Commysh Backend

## Setup

1. Copy the `.env.example` file to `.env` and fill in your database credentials:

```bash
cp .env.example .env

POSTGRES_USER=juansote
POSTGRES_PASSWORD=testpassword
POSTGRES_DB=postgres

APP_DB_USER=appuser
APP_DB_PASSWORD=appuserpassword
APP_DB_NAME=commysh_db

Start the Docker containers:

docker-compose up -d

The database and user will be initialized automatically.




docker-compose down
docker volume rm commysh-backend_postgres_data
docker-compose up -d