require("dotenv").config();

const app = require("./app");
const { connectToMongoDB } = require("./config/db");

const PORT = process.env.PORT || 8080;

const startServer = async () => {
    try {
        await connectToMongoDB();

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();