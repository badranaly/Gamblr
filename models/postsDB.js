const db = require('../db/config');

module.exports = {

  //return every card in the database
  populateFeed(input) {
    return db.any(`SELECT followers.follower_id, followers.following_id, posts.id AS postid, users.id as id, users.pic, posts.type, posts.user_id, users.user_name, posts.notes, posts.content
                  FROM followers
                  INNER JOIN posts ON followers.following_id = posts.user_id
                  INNER JOIN users ON users.id = followers.following_id
                  WHERE followers.follower_id = $1 ORDER BY posts.id DESC`, input);
  },
  populateLikes(input) {
    return db.any(`SELECT posts.user_id, post_id, type, content, notes, user_name, pic  FROM likes
                  JOIN posts ON posts.id = likes.post_id
                  JOIN users ON users.id = posts.user_id
                  WHERE likes.user_id = $1`,input)
  },

  addLike(post) {
    return db.one(`INSERT INTO likes (post_id, user_id)
                  VALUES ($/post_id/, $/user_id/) RETURNING *`, post)
              .then(like => {
                    return db.none(`UPDATE posts SET notes=notes+1 WHERE id=$1`,like.post_id)
              })
  },

  removeLike(input) {
    return db.none(`DELETE FROM likes WHERE post_id=$[postid] and user_id=$[userid]`, input)
  },

  subtractLike(input) {
    console.log("input to subtract", input)
    return db.none(`UPDATE posts SET notes=notes-1 WHERE id=$1`,input)
  },

  getPost(id) {
    return db.one(`SELECT * FROM posts WHERE id=$1`,id)
  },

  createPost(post) {
  return db.one(`INSERT INTO posts (type, content, user_id, notes)
                VALUES ($[type], $[content], $[user_id], $[notes])
                RETURNING *`, post)
  },

  userPage(username) {
    return db.any(`SELECT posts.id, type, content, user_id, notes, user_name, pic FROM posts
                    JOIN users ON posts.user_id=users.id
                    WHERE user_name=$1 ORDER BY posts.id DESC`, username)
  },

  myPosts(user) {
    return db.any('SELECT posts.id, type, content, user_id, notes, user_name, pic FROM posts INNER JOIN users ON posts.user_id=users.id WHERE posts.user_id = $1 ORDER BY posts.id DESC', user)
  },

  singlePost(id) {
    return db.any(`SELECT posts.id, users.user_name, users.blog_name, users.pic, posts.type, posts.content, posts.notes
                  FROM posts
                  INNER JOIN users ON users.id = posts.user_id
                  WHERE posts.id = $[id]`, id)
  },

  getComments(id) {
    return db.any(`SELECT users.user_name, users.pic, comments.comment
                  FROM comments
                  INNER JOIN posts ON posts.id = comments.post_id
                  INNER JOIN users ON comments.user_id = users.id
                  WHERE posts.id = $[id] ORDER BY comments.id`, id)
  },

  addComment(input) {
    return db.any(`INSERT INTO comments (comment, user_id, post_id)
                   VALUES ($[comment], $[user], $[id])`, input)
  },

  checkLikes(input) {
    return db.one(`SELECT * FROM likes WHERE user_id=$[user_id] AND post_id=$[post_id]`, input)
  }



//  addNote(post) {
//    return db.one('')
//  },
//  removeNote(post) {
//
//  }

}
