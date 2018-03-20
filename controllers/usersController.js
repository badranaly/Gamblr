const Users = require('../models/usersDB');

const usersController = {};

usersController.editUser = (req, res) => {
  Users.updateUser(req.body)
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
  Users.deleteUser(req.body)
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
}

;

module.exports = usersController;
