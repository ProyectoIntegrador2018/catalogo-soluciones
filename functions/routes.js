const express = require('express');
const router = express.Router();
const auth = require('./middleware/auth');

const sessions = require('./controllers/sessions');
