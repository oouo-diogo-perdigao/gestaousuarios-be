import express from 'express'; //Includes básicos do express
import UserController from '../controllers/UserController';

const router = express.Router();

UserController.createTable().then(() => {
	console.log('Tabela users criada');

	router.post('/', UserController.criar);

	router.get('/', UserController.listar);
	router.get('/:id', UserController.listar);

	router.put('/:id', UserController.atualizar);
	router.delete('/:id', UserController.deletar);
});

export default router;
