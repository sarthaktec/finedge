const express = require("express");

const router = express.Router();

const {
    createTransaction,
    getAllTransactions,
    getTransactionByID,
    updateTransaction,
    deleteTransaction,
} = require("../controller/trasactionController");

const authMiddleware = require("../middleware/authMiddleware");

// CRUD Routes
router.post("/", authMiddleware, createTransaction);

router.get("/", authMiddleware, getAllTransactions);

router.get("/:id", authMiddleware, getTransactionByID);

router.patch("/:id", authMiddleware, updateTransaction);

router.delete("/:id", authMiddleware, deleteTransaction);

module.exports = router;