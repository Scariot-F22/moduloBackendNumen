const express = require('express');
const   routes = express.Router();
const { userController, productController } = require('../controllers');
const { userSchema } = require('../controllers/schemas');
const { isAuth } = require('../middlewares/isAuth');

routes.post('/login', userController.login);
routes.post('/register', userSchema, userController.register);
routes.post('/hi',isAuth, userController.sayHi);

routes.post('/products', productController.createProducts);

module.exports = routes;