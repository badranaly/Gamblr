const express = require('express');
const postsController = require('../controllers/postsController');

const postRoutes = express.Router();

postRoutes.get('/feed', postsController.feed);
postRoutes.get('/like', postsController.likes);
postRoutes.get('/user', postController.userPage)
postRoutes.post('/', postsController.create);
//postRoutes.put('/:id', postsController.editUser);
//postRoutes.delete('/:id', postController.deleteUser);

module.exports = postRoutes;
