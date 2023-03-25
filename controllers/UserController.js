const { userId } = req.params; // pega o id do user passado

import { postgre } from '../../class/postgre';

postgre
	.query({
		text: 'SELECT nick, avatar FROM public.user WHERE id=$1;',
		values: [userId],
	})
	.then(async (sql) => {
		if (sql.rowCount) res.status(200).json(sql.rows[0]);
		else throw new Error('Usuário não encontrado');
	})
	.catch((e) => res.status(500).json({ error: e }));

import User from '../models/User';

class UserController {
	async listar(req, res) {
		const users = await User.findAll();
		return res.json(users);
	}

	async criar(req, res) {
		const user = await User.findByPk(req.params.id);

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		return res.json(user);
	}

	async atualizar(req, res) {
		const { name, email, password, api_contract } = req.body;

		const user = await User.create({ name, email, password, api_contract });

		return res.status(201).json(user);
	}

	async deletar(req, res) {
		const user = await User.findByPk(req.params.id);

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		const { name, email, password, api_contract } = req.body;
		const updatedUser = await user.update({
			name,
			email,
			password,
			api_contract,
		});

		return res.status(200).json(updatedUser);
	}
}

export default new UserController();
