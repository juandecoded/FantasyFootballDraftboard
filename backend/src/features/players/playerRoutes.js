const express = require('express');
const playerController = require('./playerController');

const router = express.Router();

router.get('/', playerController.getPlayers);

module.exports = router;