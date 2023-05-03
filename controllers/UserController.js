import { openDb } from '../config/database';

class UserController {
	async createTable() {
		// Cria tabela users com _id, name, email, password
		return openDb().then(async (db) => {
			await db.exec(`
				CREATE TABLE IF NOT EXISTS users (
					_id INTEGER PRIMARY KEY AUTOINCREMENT,
					name TEXT NOT NULL,
					email TEXT NOT NULL,
					password TEXT NOT NULL
				)
			`);
		});
	}
	async dropTable() {
		// Deleta a tabela users
		return openDb().then(async (db) => {
			await db.exec(`DROP TABLE users`);
		});
	}

	async listar(req, res) {
		if (req.params.id) {
			//pega somente o especifico
			openDb().then(async (db) => {
				db.get(`SELECT _id, name, email FROM users WHERE _id = ?`, [req.params.id])
					.then((result) => {
						if (!result) {
							res.status(404).json({ error: 'User not found' });
						} else {
							res.json(renamedData);
						}
					})
					.catch((err) => {
						res.status(404).json({ error: err });
					});
			});
		} else {
			//pega todos na ausencia de um especifico
			openDb().then(async (db) => {
				db.all(`SELECT _id, name, email FROM users`)
					.then((result) => {
						res.set('Access-Control-Expose-Headers', 'X-Total-Count');
						res.set('X-Total-Count', result.length);

						const renamedData = result.map(({ _id, ...rest }) => ({
							id: _id,
							...rest,
						}));

						res.json(renamedData);
					})
					.catch((err) => {
						res.status(500).json({ error: err });
					});
			});
		}
	}

	async criar(req, res) {
		const { name, email, password } = req.body;
		if (name && email && password) {
			openDb().then(async (db) => {
				db.run(
					`INSERT INTO users (name, email, password)
						VALUES (?,?,?)`,
					[name, email, password]
				)
					.then((result) => {
						//retorna codigo 201 de criado e o id do usuario criado
						res.status(201).json({ id: result.lastID });
					})
					.catch((err) => {
						res.status(500).json({ error: err });
					});
			});
		} else {
			res.status(404).json({ erro: 'Dados incompletos' });
		}
	}

	async atualizar(req, res) {
		const { name, email, password } = req.body;
		const _id = req.params.id;

		if (_id && name && email && password) {
			openDb().then(async (db) => {
				db.run(`UPDATE users SET name = ?, email = ?, password = ? WHERE _id = ?`, [name, email, password, _id])
					.then((result) => {
						if (result.changes === 0) {
							res.status(404).json({ error: 'User not found' });
						} else {
							res.status(200).json({ id: _id });
						}
					})
					.catch((err) => {
						res.status(500).json({ error: err });
					});
			});
		} else {
			res.status(404).json({ erro: 'Dados incompletos' });
		}
	}

	async deletar(req, res) {
		const _id = req.params.id;

		if (_id) {
			openDb().then(async (db) => {
				db.run(`DELETE FROM users WHERE _id = ?`, [_id])
					.then((result) => {
						if (result.changes === 0) {
							res.status(404).json({ error: 'User not found' });
						} else {
							res.status(204).json({ id: _id });
						}
					})
					.catch((err) => {
						res.status(500).json({ error: err });
					});
			});
		} else {
			res.status(404).json({ error: 'User not found' });
		}
	}
}

export default new UserController();
