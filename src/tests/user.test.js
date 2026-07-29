const request = require("supertest");
const app = require("../app");

describe("User API", () => {

    const user = {
        name: "John Doe",
        email: "john@example.com",
        password: "Password123"
    };

    test("should register a new user", async () => {

        const res = await request(app)
            .post("/users/signup")
            .send(user);

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("User Created Succefully");
        expect(res.body).toHaveProperty("id");
        expect(res.body.name).toBe(user.name);
        expect(res.body.email).toBe(user.email);

    });

    test("should not register duplicate user", async () => {

        await request(app)
            .post("/users/signup")
            .send(user);

        const res = await request(app)
            .post("/users/signup")
            .send(user);

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("User with this email alredy exist");

    });

    test("should login successfully", async () => {

        await request(app)
            .post("/users/signup")
            .send({
                name: "Jane",
                email: "jane@example.com",
                password: "Password123"
            });

        const res = await request(app)
            .post("/users/login")
            .send({
                email: "jane@example.com",
                password: "Password123"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Login successfully");
        expect(res.body).toHaveProperty("token");

    });

    test("should reject invalid credentials", async () => {
        const res = await request(app)
            .post("/users/login")
            .send({
                email: "jane@example.com",
                password: "WrongPassword"
            });

            console.log(res.statusCode);
            console.log(res.body);

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("Invalid credentials");

    });

});