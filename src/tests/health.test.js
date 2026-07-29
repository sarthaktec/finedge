const request = require("supertest");
const app = require("../app");

describe("Health API", () => {
    test("GET /health should return server status", async () => {
        const res = await request(app).get("/health");

        expect(res.statusCode).toBe(200);

        expect(res.body.success).toBe(true);

        expect(res.body.message).toBe("Server is running");

        expect(res.body).toHaveProperty("timestamp");
    });
});