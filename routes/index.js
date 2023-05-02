import apiUsers from './users';

/**
 * Arquivo centralizando as rotas
 * @export
 * @param {*} app
 * @param {*} server
 * @param {*} basePath usada para versionar a api
 */
export default function routers(app, server, basePath = '') {
	app.use(basePath + '/users', apiUsers);
}
