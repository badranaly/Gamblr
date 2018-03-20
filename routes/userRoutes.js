const express = require('express');
const usersController = require('../controllers/usersController');

const userRoutes = express.Router();

//userRoutes.get('/', usersController.index);
//userRoutes.get('/:id', usersController.show);
userRoutes.post('/', usersController.create);
userRoutes.put('/:id', usersController.editUser);
userRoutes.delete('/:id', usersController.deleteUser);

module.exports = userRoutes;
