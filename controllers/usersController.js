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

usersController.getUser = (req, res) => {
  Users.findUser(req.body)
  .then(user => {
    res.json({
      message: 'ok',
      data: {user}
    })
  })
  .catch(err => {
    res.status(400).json({message: '400', err})
  })
}

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
  let sendObj = {}
  sendObj.following_id = req.body.content[0].id
  Users.followUser(sendObj)
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
  let sendObj = {}
  sendObj.following_id = req.params.id
  Users.unfollowUser(sendObj)
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

usersController.authenticateUser = (req, res) => {
console.log(req.body)
Users.authenticate(req.body)
.then(user => {
  console.log(user)
    // res.json({
    //   message: ok,
    //   data: {user}
    // })
  })
  .catch(err => {
    res.status(400).json({message: '400', err})
  })
},

usersController.getID = (req, res) => {
  let sendObj = {}
  sendObj.user_name = req.params.un
  Users.returnID(sendObj)
  .then(user => {
    res.json({
      message: 'ok',
      data: { user }
    })
  })
  .catch(err => {
    res.status(400).json({message: '400', err})
  })
}

;

module.exports = usersController;
