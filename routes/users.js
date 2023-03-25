import UserController from '../controllers/UserController';
const UserController = require('../controllers/UserController');

import express from 'express'; //Includes básicos do express
const router = express.Router();

router.get('/', UserController.listar);
router.post('/', UserController.criar);
router.get('/:id', UserController.listar);
router.put('/:id', UserController.atualizar);
router.delete('/:id', UserController.deletar);

export default router;
