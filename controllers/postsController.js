const Posts = require('../models/postsDB');

const postsController = {};

postsController.feed = (req, res) => {
  Posts.populateFeed()
    .then(posts => {
      res.json({
        message: 'ok',
        data: { posts },
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({message: '400', err});
    });
},

postsController.likes = (req, res) => {
  Posts.populateLikes()
    .then(posts => {
      res.json({
        message: 'ok',
        data: {posts},
      })
    })
    .catch(err => {
      res.status(400).json({message: '400', err})
    });
},

postsController.create = (req, res) => {
  Posts.createPost(req.body.post)
    .then(post => {
      res.json({
        message: 'ok',
        data: {post}
      })
    })
    .catch(err => {
      res.status(400).json({message: '400', err})
    })
},

postsController.userPage = (req, res) => {
  Posts.userPage(req.body)
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
}
;

module.exports = postsController;
