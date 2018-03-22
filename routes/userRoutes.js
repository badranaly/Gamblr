const express = require('express');
const usersController = require('../controllers/usersController');

const userRoutes = express.Router();

//userRoutes.get('/', usersController.index);
//userRoutes.get('/:id', usersController.show);
userRoutes.delete('/follower/:id', usersController.unfollowUser);
userRoutes.post('/follower', usersController.followUser);
userRoutes.get('/following', usersController.listFollowing);
userRoutes.get('/followers', usersController.listFollowers);
userRoutes.post('/', usersController.create);
userRoutes.put('/:un', usersController.editUser);
userRoutes.put('/settings', usersController.changePassword);
userRoutes.delete('/:un', usersController.deleteUser);
userRoutes.post('/login', usersController.authenticateUser);
userRoutes.get('/lookup/:un', usersController.getID);

module.exports = userRoutes;
