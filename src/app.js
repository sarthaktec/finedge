const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const summaryRoutes = require("./routes/summaryRoutes");
const budgetRoutes = require("./routes/budgetRoutes");

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

app.use(cors());

app.use(logger);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: "Too many requests. Try again later.",
    },
});

app.use(limiter);

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running",
        timestamp: new Date().toISOString(),
    });
});

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to FinEdge API 🚀",
    });
});

app.use("/users", userRoutes);
app.use("/transactions", transactionRoutes);
app.use("/summary", summaryRoutes);
app.use("/budgets", budgetRoutes);

app.use(errorHandler);

module.exports = app;