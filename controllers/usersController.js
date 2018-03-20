const Users = require('../models/usersDB');

const usersController = {};

usersController.editUser = (req, res) => {
  Users.updateUser(req.params.un)
    .then(user => {
      res.json({
        message: 'ok',
        data: { user },
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({message: '400', err});
    });
},

usersController.deleteUser = (req, res) => {
  Users.deleteUser(req.params.un)
    .then(user => {
      res.json({
        message: 'ok',
        data: { user },
      })
    })
    .catch(err => {
      res.status(400).json({message: '400', err});
    })
},

usersController.create = (req, res) => {
  Users.createUser(req.body)
    .then(user => {
      res.json({
        message: 'ok',
        data: { user },
      })
    })
    .catch(err => {
      res.status(400).json({message: '400', err});
    })
},

usersController.listFollowing = (req, res) => {
  Users.listFollowing()
    .then(users => {
      res.json({
        message: 'ok',
        data: { users }
      })
    })
    .catch(err => {
      res.status(400).json({message: '400', err})
    })
},

usersController.followUser = (req, res) => {
  Users.followUser(req.body)
    .then(user => {
      res.json({
        message: 'ok',
        data: { user }
      })
    })
    .catch(err => {
      res.status(400).json({message: '400', err})
    })
},

usersController.unfollowUser = (req, res) => {
  Users.unfollowUser(req.body)
    .then(user => {
      res.json({
        message: 'ok',
        data: { user }
      })
    })
    .catch(err => {
      res.status(400).json({message: '400', err})
    })
},

usersController.listFollowers = (req, res) => {
  Users.listFollowers()
    .then(users => {
      res.json({
        message: 'ok',
        data: { users }
      })
    })
    .catch(err => {
      res.status(400).json({message: '400', err})
    })
}

;

module.exports = usersController;
