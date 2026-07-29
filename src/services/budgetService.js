const Budget = require('../model/budgetModel');

const createBudget = async (req, res) => {
    return await Budget.create(data);
}

const getBudget = async (userId) => {
    return await Budget.find({ user: userId });
};

const updateBudget = async (id, userId, data) => {
    return await Budget.findOneAndUpdate(
        {
            _id: id,
            user: userId,
        },
        data,
        {
            new: true,
            runValidators: true,
        }
    );
};

const deleteBudget = async (id, userId) => {
    return await Budget.findOneAndDelete({
        _id: id,
        user: userId,
    });
};

module.exports = {
    createBudget,
    getBudget,
    updateBudget,
    deleteBudget,
};