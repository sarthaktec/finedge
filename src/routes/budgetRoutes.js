const express = require("express");
const router = express.Router();

const {createBudget, getBudget, updateBudget, deleteBudget} = require("../controller/budgetController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createBudget);
router.get('/:id', getBudget);
router.patch('/:id', updateBudget);
router.delete('/:id', deleteBudget);

module.exports = router;