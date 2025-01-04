require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const draftRoutes = require('./src/features/drafts/draftRoutes');
const  createDatabaseTables = require('./src/config/createDatabaseTables');

const app = express();
const port = 3069;

app.use(cors());
app.use(bodyParser.json());

app.use('/drafts', draftRoutes);

app.get('/', (req, res) => {
    res.status(200).json('Hello commysh server');
  }
);

createDatabaseTables();

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});