const express = require('express');
const router = express.Router();
const auth = require('./middleware/auth');

const sessions = require('./controllers/sessions');

router.post('/signUp', sessions.signUp);

module.exports = router;
