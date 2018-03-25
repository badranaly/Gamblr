const express = require('express');
const postsController = require('../controllers/postsController');

const postRoutes = express.Router();

postRoutes.get('/feed/:id', postsController.feed);
postRoutes.get('/like/:id', postsController.likes);
postRoutes.put('/subtractLike/:id', postsController.subtractLike)
postRoutes.get('/user/:username', postsController.userPage);
postRoutes.get('/post/:id', postsController.getPost)
postRoutes.post('/', postsController.create);
postRoutes.post('/like', postsController.addLike);
postRoutes.delete('/like/:postId/:userId', postsController.removeLike);
postRoutes.get('/checkLikes/:postId/:userId', postsController.checkLikes)
postRoutes.get('/myPosts/:id', postsController.myPosts);
postRoutes.get('/singlePost/:id', postsController.singlePost);
postRoutes.get('/getComments/:id', postsController.getComments);
postRoutes.post('/comment/:id', postsController.addComment);
//postRoutes.put('/:id', postsController.editUser);
//postRoutes.delete('/:id', postController.deleteUser);

module.exports = postRoutes;
