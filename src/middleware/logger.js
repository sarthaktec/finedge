const logger = (req, res, next) => {
    console.log(
        `${new Date().toISOString()} | ${req.method} | ${req.orignalUrl}`
    );

    next();
};

module.exports = logger;