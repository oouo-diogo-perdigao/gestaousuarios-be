import supertest from 'supertest';
import app from '../../app';

describe('UserController', () => {
	// testa rota de criação de usuário
	describe('POST /users', () => {
		it('Tenta criar usuário de teste', async () => {
			const res = await supertest(app).post('/users').send({
				name: 'John Doe',
				email: 'johndoe@example.com',
				password: '123456',
			});
			expect(res.status).toBe(201);
			expect(res.body).toHaveProperty('id');
		});
		it('deve retornar um erro 404 se faltar dados', async () => {
			const res = await supertest(app).post('/users').send({});
			expect(res.status).toBe(404);
			expect(res.body).toHaveProperty('erro');
		});
	});
});

let userId;

describe('UserController', () => {
	// cria um usuario virtual para cada testes
	beforeEach(async () => {
		const res = await supertest(app).post('/users').send({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		});
		userId = res.body.id;
	});

	// apaga o usuario virtual após cada teste
	afterEach(async () => {
		const res = await supertest(app).delete('/users/' + userId);
	});

	//testa rota de listagem de usuários
	describe('GET /users', () => {
		it('Verifica se usuário de teste esta entre os criados', async () => {
			const res = await supertest(app).get('/users');
			expect(res.status).toBe(200);
			expect(res.body).toBeInstanceOf(Array);
			expect(res.body.some((user) => user.email == 'johndoe@example.com')).toBe(true);
		});
		it('deve retornar um erro 404 se o usuário não existir', async () => {
			const res = await supertest(app).get('/users/0');
			expect(res.status).toBe(404);
		});
	});

	//testa rota de listagem de usuário individual
	describe('GET /users/:id', () => {
		it('Verifica se usuário de teste esta criado', async () => {
			const res = await supertest(app).get('/users/' + userId);
			expect(res.status).toBe(200);
			//verifica se o array é exatamente o criado
			expect(res.body).toEqual(
				expect.objectContaining({
					_id: userId,
					name: 'John Doe',
					email: 'johndoe@example.com',
				})
			);
		});
	});

	// testa atualizar usuário de teste
	describe('PUT /users/:id', () => {
		it('deve atualizar um usuário existente', async () => {
			const res = await supertest(app)
				.put('/users/' + userId)
				.send({
					name: 'John Doe2',
					email: 'johndoe2@example.com',
					password: 'xxxxxx',
				});
			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('id');
		});

		it('deve retornar um erro 404 se o usuário não existir', async () => {
			const res = await supertest(app)
				.put('/users/' + 0)
				.send({
					name: 'John Doe2',
					email: 'johndoe2@example.com',
					password: 'xxxxxx',
				});
			expect(res.status).toBe(404);
		});

		it('deve retornar um erro 404 se faltar dados', async () => {
			const res = await supertest(app)
				.put('/users/' + 1)
				.send({
					name: 'John Doe2',
					password: 'xxxxxx',
				});
			expect(res.status).toBe(404);
		});
	});

	// testa deletar usuário de teste
	describe('DELETE /users/:id', () => {
		it('deve deletar um usuário existente', async () => {
			const res = await supertest(app)
				.delete('/users/' + userId)
				.send();
			expect(res.status).toBe(204);
		});

		it('deve retornar um erro 404 se o usuário não existir', async () => {
			const res = await supertest(app)
				.delete('/users/' + 0)
				.send();
			expect(res.status).toBe(404);
		});

		it('deve retornar um erro 404 se não houver id', async () => {
			const res = await supertest(app)
				.delete('/users/' + 0)
				.send();
			expect(res.status).toBe(404);
		});
	});
});
