const Transaction = require("../model/transactionModel");
const cache = require("../services/cacheService");

// Create Transaction
const createTransaction = async (req, res) => {
    try {
        const {
            name,
            description,
            amount,
            type,
            category,
            paymentMethod,
            date,
            notes,
        } = req.body;

        
        const userId = req.user.id;

        if (!name || !amount || !type || !category || !paymentMethod) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields.",
            });
        }

        if (!["income", "expense"].includes(type)) {
            return res.status(400).json({
                success: false,
                message: "Type must be either income or expense.",
            });
        }

        if (amount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Amount must be greater than 0.",
            });
        }

        const transaction = await Transaction.create({
            user: userId,
            name,
            description,
            amount,
            type,
            category,
            paymentMethod,
            date,
            notes,
        });

        console.log("Created Transaction ID:", transaction._id.toString());
        console.log("Created User ID:", transaction.user.toString());
        console.log("JWT User ID:", req.user.id);

        cache.del("summary");

        return res.status(201).json({
            success: true,
            message: "Transaction created successfully.",
            data: transaction,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// Get All Transactions
const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({
            user: req.user.id,
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Transactions fetched successfully.",
            data: transactions,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// Get Transaction By ID
const getTransactionByID = async (req, res) => {
    try {
        const { id } = req.params;

        console.log("Requested Transaction ID:", id);
        console.log("JWT User ID:", req.user.id);

        const byId = await Transaction.findById(id);
        console.log("findById:", byId);

        const transaction = await Transaction.findOne({
            _id: id,
            user: req.user.id,
        });

        console.log("findOne:", transaction);

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Transaction fetched successfully.",
            data: transaction,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// Update Transaction
const updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            name,
            description,
            amount,
            type,
            category,
            paymentMethod,
            date,
            notes,
        } = req.body;

        if (type && !["income", "expense"].includes(type)) {
            return res.status(400).json({
                success: false,
                message: "Type must be either income or expense.",
            });
        }

        if (amount && amount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Amount must be greater than 0.",
            });
        }

        const updatedTransaction = await Transaction.findOneAndUpdate(
            {
                _id: id,
                user: req.user.id,
            },
            {
                name,
                description,
                amount,
                type,
                category,
                paymentMethod,
                date,
                notes,
            },
            {
                returnDocument: "after",
                runValidators: true,

            }
        );

        if (!updatedTransaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found.",
            });
        }

        cache.del("summary");

        return res.status(200).json({
            success: true,
            message: "Transaction updated successfully.",
            data: updatedTransaction,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// Delete Transaction
const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTransaction = await Transaction.findOneAndDelete({
            _id: id,
            user: req.user.id,
        });

        if (!deletedTransaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found.",
            });
        }

        cache.del("summary");

        return res.status(200).json({
            success: true,
            message: "Transaction deleted successfully.",
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = {
    createTransaction,
    getAllTransactions,
    getTransactionByID,
    updateTransaction,
    deleteTransaction,
};