
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    DO
    \$do\$
    BEGIN
        IF NOT EXISTS (
            SELECT
            FROM pg_catalog.pg_user
            WHERE usename = '$APP_DB_USER') THEN
            CREATE USER $APP_DB_USER WITH PASSWORD '$APP_DB_PASSWORD';
        END IF;
    END
    \$do\$;

    CREATE DATABASE $APP_DB_NAME;

    GRANT ALL PRIVILEGES ON DATABASE $APP_DB_NAME TO $APP_DB_USER;

EOSQL

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    GRANT ALL PRIVILEGES ON SCHEMA public TO $APP_DB_USER;
    ALTER USER $APP_DB_USER WITH SUPERUSER;
EOSQL