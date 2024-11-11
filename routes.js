const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const apiController = require('./src/controllers/apiController')
// const { loginRequired } = require('./src/middlewares/middleware')

// Rotas da home
route.get('/', homeController.index);
// route.get('/:id', homeController.index )
//Rotas de login
route.get('/login', loginController.index)
route.post('/login/register', loginController.register)
route.post('/login/login', loginController.login)
route.get('/login/logout', loginController.logout)

route.get('/api', apiController.index)
route.get('/views/dados_lixo.json', apiController.paginaDoJson)

module.exports = route;
