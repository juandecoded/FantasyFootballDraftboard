const express = require('express');
const draftController = require('./draftController');

const router = express.Router();

router.post('/', draftController.createDraft);
router.get('/:draftId', draftController.getDraft);
router.post('/draftPlayer', draftController.draftPlayer);

module.exports = router;