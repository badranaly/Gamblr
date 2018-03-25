const Users = require('../models/usersDB');
const bcrypt = require('bcrypt')
const TokenService = require('../services/TokenService');
const db = require('../db/config')

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

usersController.create = (req, res, next) => {
  const user = req.body
  console.log('inside create function ->', req.body);
  const passwordDigest = bcrypt.hashSync(user.password, 10);
  db.one(
    'INSERT INTO users (user_name, password) VALUES ($1, $2) RETURNING *;', [user.user_name, passwordDigest, 0]
  )
  .then(data => {
    // remove the password_digest since it's sensitive
    const { password, ...userData } = data;
    res.locals.user = userData;
    console.log('user created');
    const tokenData = {
      username: userData.user_name,
    };

    // pass some bit of data into makeToken
    TokenService.makeToken(tokenData)
      .then(token => {
        console.log('token is here --->  ',token);
        res.locals.token = token; // pass the token into res.locals
        console.log('this is res locals token ----> ', res.locals.token);
        next() // calling next()
      }).catch(next); // call next with error object

  }).catch(err => {
    console.log(`User Create failed: ${err}`)
    next();
  });
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

usersController.login = function(req, res, next) {
  const user = req.body;
  console.log('this is req.body', req.body)
  //compare the password with  passwordDigest
  Users.findUser(user.user_name)
  .then(userData => {
    const isAuthed = bcrypt.compareSync(user.password, userData.password)
    console.log('this is before checking auth');
    if(!isAuthed){
      next()
    }
    console.log('i should be here if authorized');
    res.locals.user = userData;

    const data = {
      username: userData.user_name
    }

    TokenService.makeToken(data)
        .then(token => {
          res.locals.token = token; // set the token on res.locals
          next()
        }).catch(err => {
          next();
        });

      }).catch(err => {
        next();
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

;

module.exports = usersController;
