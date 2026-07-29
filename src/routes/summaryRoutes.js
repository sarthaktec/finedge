const express = require("express");

const router = express.Router();

const { getSummary } = require('../controller/summaryController');

const authMiddleware = require("../middleware/authMiddleware");


// CRUD Routes
router.get('/', authMiddleware ,getSummary);

module.exports = router;