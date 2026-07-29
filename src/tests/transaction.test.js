const request = require("supertest");
const app = require("../app");

describe("Transaction API", () => {
    let token;
    let transactionId;

    beforeAll(async () => {
        const email = `test${Date.now()}@example.com`;

        // Register
        await request(app)
            .post("/users/signup")
            .send({
                name: "Test User",
                email,
                password: "Password123",
            });

        // Login
        const loginRes = await request(app)
            .post("/users/login")
            .send({
                email,
                password: "Password123",
            });

        token = loginRes.body.token;
    });

    beforeEach(async () => {
        const createRes = await request(app)
            .post("/transactions")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Salary",
                description: "Monthly Salary",
                amount: 50000,
                type: "income",
                category: "Salary",
                paymentMethod: "Bank Transfer",
                notes: "Salary Credited",
            });

        expect(createRes.statusCode).toBe(201);

        transactionId = createRes.body.data._id;
    });

    test("should create transaction", async () => {
        expect(transactionId).toBeDefined();
    });

    test("should fetch all transactions", async () => {
        const res = await request(app)
            .get("/transactions")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe(
            "Transactions fetched successfully."
        );
        expect(Array.isArray(res.body.data)).toBe(true);
    });

    test("should fetch transaction by id", async () => {
        const res = await request(app)
            .get(`/transactions/${transactionId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe(
            "Transaction fetched successfully."
        );
        expect(res.body.data._id).toBe(transactionId);
    });

    test("should update transaction", async () => {
        const res = await request(app)
            .patch(`/transactions/${transactionId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                amount: 60000,
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe(
            "Transaction updated successfully."
        );
        expect(res.body.data.amount).toBe(60000);
    });

    test("should delete transaction", async () => {
        const res = await request(app)
            .delete(`/transactions/${transactionId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe(
            "Transaction deleted successfully."
        );
    });
});