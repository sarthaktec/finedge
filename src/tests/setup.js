require("dotenv").config();
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

beforeAll(async () => {
    // Start in-memory MongoDB
    mongoServer = await MongoMemoryServer.create();

    const uri = mongoServer.getUri();

    // Connect Mongoose
    await mongoose.connect(uri);
});

afterEach(async () => {
    // Clear all collections after each test
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        await collections[key].deleteMany({});
    }
});

afterAll(async () => {
    // Close connection
    await mongoose.connection.close();

    // Stop MongoDB
    await mongoServer.stop();
});