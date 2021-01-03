const express = require('express');

const router = express.Router();

const awRoute = require('./adventureworks.js');

router.use('/aw', awRoute);

module.exports = router;
