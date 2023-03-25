const request = require("supertest");
const app = require("../../app");
const User = require("../../models/User");

describe("User Endpoints", () => {
	afterEach(async () => {
		await User.destroy({ where: {} });
	});

	describe("GET /users", () => {
		test("should return a list of users", async () => {
			await User.bulkCreate([
				{
					name: "John Doe",
					email: "john@example.com",
					password: "123456",
					api_contract: "basic",
				},
				{
					name: "Jane Doe",
					email: "jane@example.com",
					password: "123456",
					api_contract: "pro",
				},
			]);

			const res = await request(app).get("/users");
			expect(res.statusCode).toEqual(200);
			expect(res.body).toHaveLength(2);
		});
	});

	describe("POST /users", () => {
		test("should create a new user", async () => {
			const newUser = {
				name: "John Doe",
				email: "john@example.com",
				password: "123456",
				api_contract: "basic",
			};

			const res = await request(app).post("/users").send(newUser);
			expect(res.statusCode).toEqual(201);
			expect(res.body).toHaveProperty("id");
			expect(res.body.name).toEqual(newUser.name);
			expect(res.body.email).toEqual(newUser.email);
			expect(res.body.password).toEqual(newUser.password);
			expect(res.body.api_contract).toEqual(newUser.api_contract);
		});
	});

	describe("GET /users/:id", () => {
		test("should return user details", async () => {
			const user = await User.create({
				name: "John Doe",
				email: "john@example.com",
				password: "123456",
				api_contract: "basic",
			});

			const res = await request(app).get(`/users/${user.id}`);
			expect(res.statusCode).toEqual(200);
			expect(res.body.name).toEqual(user.name);
			expect(res.body.email).toEqual(user.email);
		});

		test("should return 404 when user is not found", async () => {
			const res = await request(app).get("/users/999");
			expect(res.statusCode).toEqual(404);
		});
	});

	describe("PUT /users/:id", () => {
		test("should update a user", async () => {
			const user = await User.create({
				name: "John Doe",
				email: "john@example.com",
				password: "123456",
				api_contract: "basic",
			});

			const updatedUser = {
				name: "John Updated",
				email: "john_updated@example.com",
				password: "654321",
				api_contract: "pro",
			};

			const res = await request(app).put(`/users/${user.id}`).send(updatedUser);
			expect(res.statusCode).toEqual(200);
			expect(res.body.name).toEqual(updatedUser.name);
			expect(res.body.email).toEqual(updatedUser.email);
			expect(res.body.password).toEqual(updatedUser.password);
			expect(res.body.api_contract).toEqual(updatedUser.api_contract);
		});

		test("should return 404 when user is not found", async () => {
			const res = await request(app)
				.put("/users/999")
				.send({ name: "Not Found" });
			expect(res.statusCode).toEqual(404);
		});
	});

	describe("DELETE /users/:id", () => {
		test("should delete a user", async () => {
			const user = await User.create({
				name: "John Doe",
				email: "john@example.com",
				password: "123456",
				api_contract: "basic",
			});

			const res = await request(app).delete(`/users/${user.id}`);
			expect(res.statusCode).toEqual(204);
		});

		test("should return 404 when user is not found", async () => {
			const res = await request(app).delete("/users/999");
			expect(res.statusCode).toEqual(404);
		});
	});
});
