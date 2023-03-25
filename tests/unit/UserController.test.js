const UserController = require("../../controllers/UserController");
const User = require("../../models/User");

jest.mock("../../models/User");

describe("UserController", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("index should return a list of users", async () => {
		const users = [
			{
				id: 1,
				name: "John Doe",
				email: "john@example.com",
				password: "123456",
				api_contract: "basic",
			},
			{
				id: 2,
				name: "Jane Doe",
				email: "jane@example.com",
				password: "123456",
				api_contract: "pro",
			},
		];

		User.findAll.mockResolvedValue(users);
		const req = {};
		const res = {
			json: jest.fn(),
		};

		await UserController.index(req, res);

		expect(res.json).toHaveBeenCalledWith(users);
	});

	// Implemente os demais testes para show, store, update e delete seguindo a mesma estrutura.
});
