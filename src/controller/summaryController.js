const summaryServices = require('../services/summaryServices');

const getSummary = async (req, res, next) => {
    try {
        const summary = await summaryServices.getSummary();

        res.status(200).json({
            success: true,
            data: summary,
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getSummary
};