const express = require('express');
const   routes = express.Router();
const { userController } = require('../controllers');
const { isAuth } = require('../middlewares/isAuth');

routes.post('/login', userController.login);
routes.post('/register', userController.register);

routes.post('/hi',isAuth, userController.sayHi);

module.exports = routes;