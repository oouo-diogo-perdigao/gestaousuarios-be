# Gestão Usuários Backend

# Instruções ao Professor
Projeto usando jest e supertest com banco de dados sqlite.

Preparando o Projeto

		npm i

Executando os testes de sistema nos endpoints

		npm test
Para sair: "control+c"

Executando o projeto

		npm start


## Descrição
Como parte do trabalho final da disciplina, deve-se criar uma API Backend para gestão de usuários do nosso sistema final.

## Requisitos
* Sistema deve ser escrito em NodeJS
* Deve conter testes unitários
* Deve conter testes de sistema
* Cada usuário deve conter os seguintes atributos: 
	* _id
	* name
	* email
	* password


Contrato da API
| Path					| Descrição					| Cenários de Teste
| ------------- 		| ------------------------- | ------------------
| POST /users			| Criar um novo usuários	| Status Code = 201 (Created)
| GET /users			| Listar todos os usuários	| Status Code = 200 (OK)
| GET /users/:id 		| Detalhar um usuários		| 1. Status Code = 200 (OK) 2. Status Code = 404 (Not Found)
| PUT /users/:id 		| Detalhar um usuários		| 1. Status Code = 200 (OK) 2. Status Code = 404 (Not Found)
| DELETE /users/:id		| Detalhar um usuário 		| 1. Status Code = 204 (No Content) 2. Status Code = 404 (Not Found)
