const Users = require('../models/usersDB');

const usersController = {};

usersController.editUser = (req, res) => {
  console.log('got the infos yo')
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

usersController.changePassword = (req, res) => {
  Users.changePass(req.body)
  .then(user => {
    console.log('changing password')
  })
  .catch(err => {
    res.status(400).json({message:'400', err})
  })
}
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

usersController.followNew = (req, res) => {
  console.log("inside usercontroller, follownew", req.params.id)
  let sendObj = {}
  sendObj.following_id = req.params.id
  Users.followUser(sendObj)
  .then(output => {
    console.log("output", output)
  })
  .catch(err => {
    console.log(err)
  })
}

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
},

usersController.checkFollowing = (req, res) => {
  console.log('inside checkfollowing CONTROLLER', req.params.id)
  let sendObj = {}
  sendObj.following_id = req.params.id
  Users.checkFollowing(sendObj)
  .then(found => {
    res.json({
      message: 'ok',
      data: { found }
    })
  })
  .catch(err => {
    res.status(400).json({message: '400', err})
  })
}

usersController.removeLikesByUser = (req, res) => {
  Users.removeLikesByUser(req.params.id)
    .then(likes => {
      res.json({
        message: 'ok',
        data: {likes}
      })
    })
    .catch(err => {
      res.status(400).json({message: '400', err})
    })
}

usersController.removeFollowerByUser = (req, res) => {
  Users.removeFollowerByUser(req.params.id)
    .then(follower => {
      res.json({
        message: 'ok',
        data: {follower}
      })
    })
    .catch(err => {
      res.status(400).json({message: '400', err})
    })
}

usersController.removePostsByUser = (req, res) => {
  Users.removePostsByUser(req.params.id)
    .then(posts => {
      res.json({
        message: 'ok',
        data: {posts}
      })
    })
    .catch(err => {
      res.status(400).json({message: '400', err})
    })
}

usersController.removeCommentsByUser = (req, res) => {
  Users.removeCommentsByUser(req.params.id)
    .then(comments => {
      res.json({
        message: 'ok',
        data: {comments}
      })
    })
    .catch(err => {
      res.status(400).json({message: '400', err})
    })
}

;

module.exports = usersController;
