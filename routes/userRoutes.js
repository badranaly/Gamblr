const express = require('express');
const usersController = require('../controllers/usersController');
const TokenService = require('../services/TokenService');

const userRoutes = express.Router();

userRoutes.delete('/follower/:id', usersController.unfollowUser);
userRoutes.post('/follower', usersController.followUser);
userRoutes.post('/follower/:id', usersController.followNew);
userRoutes.get('/following', usersController.listFollowing);
userRoutes.get('/followers', usersController.listFollowers);
userRoutes.put('/settings', usersController.changePassword);
userRoutes.put('/:un', usersController.editUser);
userRoutes.delete('/:un', usersController.deleteUser);
userRoutes.get('/lookup/:un', usersController.getID);
userRoutes.get('/checkFollowing/:id', usersController.checkFollowing)

//post functions using Auth
userRoutes.post('/login', usersController.login, (req, res) => {
  if (!res.locals.user) {
    res.status(401).json({err: 'Login Failed'})
  } else {
    const { password_digest, ...user } = res.locals.user;
    res.json({token: res.locals.token, user});
  }
})
userRoutes.post('/signup', usersController.create, (req, res) => {
  res.json({token: res.locals.token, user: res.locals.user})
});

module.exports = userRoutes;
