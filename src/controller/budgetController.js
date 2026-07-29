const Budget = require('../services/budgetService');

const createBudget = async (req, res, next) => {
    try {
        const budget = await Budget.createBudget({
            ...req.body,
            user: req.body.id,
        });

        res.status(200).json({
            success: true,
            data: budget,
        })
    } catch (error) {
        next(error)
    }
};

const getBudget = async (req, res, next) => {
    try {
        const budgets = await budgetService.getBudget(req.user.id);

        res.status(200).json({
            success: true,
            data: budgets,
        });
    } catch (error) {
        next(error);
    }
};

const updateBudget = async (req, res, next) => {
    try {
        const budget = await budgetService.updateBudget(
            req.params.id,
            req.user.id,
            req.body
        );

        if (!budget) {
            return res.status(404).json({
                success: false,
                message: "Budget not found",
            });
        }

        res.status(200).json({
            success: true,
            data: budget,
        });
    } catch (error) {
        next(error);
    }
};

const deleteBudget = async (req, res, next) => {
    try {
        const budget = await budgetService.deleteBudget(
            req.params.id,
            req.user.id
        );

        if (!budget) {
            return res.status(404).json({
                success: false,
                message: "Budget not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Budget deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {createBudget, getBudget, updateBudget, deleteBudget};