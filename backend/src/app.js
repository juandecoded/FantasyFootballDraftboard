const express = require('express');
const draftRoutes = require('./features/drafts/draftRoutes');
const errorHandler = require('./middleware/errorHandler');
const playerRoutes = require('./features/players/playerRoutes');

const app = express();

app.use(express.json());
// app.use((req, res, next) => {
//   console.log(`Received ${req.method} request for ${req.url}`);
//   console.log('Request body:', req.body);
//   console.log('Request query:', req.query);
//   console.log('Request header:', req.headers);
//   console.log('Request params:', req.params);
//   next();
// });
app.use('/drafts', draftRoutes);
app.use('/players', playerRoutes);
app.use(errorHandler);

module.exports = app;