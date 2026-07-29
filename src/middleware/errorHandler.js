const errorHandler = (err, req, res, next) => {
    console.error(err);

    res.status(err.status || 500).json({
        success: false,
        massege: err.messege || "inernal server error",
    });
}

module.exports = errorHandler;