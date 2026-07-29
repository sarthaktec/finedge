const Transaction = require("../model/transactionModel");
const cache = require("./cacheService");

const getSummary = async () => {
    // Check cache first
    const cachedSummary = cache.get("summary");

    if (cachedSummary) {
        console.log("Summary served from cache");
        return cachedSummary;
    }

    // Fetch transactions from database
    const transactions = await Transaction.find();

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
        if (transaction.type === "income") {
            totalIncome += transaction.amount;
        } else {
            totalExpense += transaction.amount;
        }
    });

    const summary = {
        totalIncome,
        totalExpense,
        balance: totalIncome - totalExpense,
        transactionCount: transactions.length,
    };

    // Store in cache for 60 seconds
    cache.set("summary", summary, 60);

    console.log("Summary calculated from database");

    return summary;
};

module.exports = {
    getSummary,
};