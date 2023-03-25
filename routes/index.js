import apiUsers from './users';

/**
 * Arquivo centralizando as rotas
 * @export
 * @param {*} app
 * @param {*} server
 * @param {*} basePath
 */
export default function routers(app, server, basePath) {
	app.use(basePath + '/users', apiUsers);
}
