const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.APP_DB_USER,
    password: process.env.APP_DB_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.APP_DB_NAME
});

module.exports = pool;