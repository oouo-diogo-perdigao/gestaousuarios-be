import express from 'express'; //Includes básicos do express
import http from 'http';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import yamljs from 'yamljs';
import cors from 'cors';
import { openDb } from './config/database';

const app = express();
const server = http.createServer(app); //Enviar requisições http

openDb(); // abre banco de dados usando a extenção recomendada você pode visualiza-lo

app.use(morgan('dev')); //tratamentos de http
app.use(express.json()); //reconhece solicitação de entrada como json
app.use(express.urlencoded({ extended: false })); //reconhece o objeto de solicitação recebido como cadeias ou matrizes
app.use(cors());

import routers from './routes';
routers(app, server);

//swagger
const file = fs.readFileSync('./docs/swagger.yaml', 'utf8');
const swaggerDocument = yamljs.parse(file);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//#region Manipuladores de errors
// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, not providing error in production
	res.locals.message = err.message;
	res.locals.error = err;
	res.status(err.status || 500).send('error');
});
//#endregion

//Inicia o servidor escutando na porta 8002
const port = 8001;
server.listen(port, (_) => {
	console.log(`App type dev listening on port ${port}! http://localhost:${port}`);
});

export default app;
