const express = require('express');
const router = express.Router();
const evaluationController = require('../controllers/evaluationController');

// In production, add JWT middleware here: router.post('/', authMiddleware, createEvaluation)
router.post('/', evaluationController.createEvaluation);

module.exports = router;