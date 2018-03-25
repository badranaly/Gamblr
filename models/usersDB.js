const db = require('../db/config');

module.exports = {

  createUser(user) {
    return db.one(`INSERT INTO users (user_name, password) VALUES ($[user_name], $[password]) RETURNING *`, [user.user_name, user.passwordDigest, 0]);
  },

  findUser(username){
    return db.one(`SELECT * FROM users WHERE user_name = $1`, username)
  },

  userLogin(input){
    return db.one(`SELECT * FROM users WHERE user_name=$[user_name] AND password=$[password]`, input)
  },

  authenticate(user){
    return db.one(`SELECT * FROM users WHERE user_name = $[user_name] AND password = $[password]`, user)
  },

  listFollowing(user) {
    return db.many('SELECT user_name, blog_name, pic FROM followers INNER JOIN users ON following_id = users.id WHERE follower_id = $1', user)
  },

  changePass(user, passwordDigest){
    console.log('inside usersdb --> ', user)
    return db.none(`UPDATE users SET password=$2 WHERE user_name=$1`, [user.username, passwordDigest, 0])
  },

  followUser(user) {
    return db.one('INSERT INTO followers (follower_id, following_id) VALUES($[follower_id], $[following_id]) RETURNING *', user)
  },

  unfollowUser(id) {
    return db.none('DELETE FROM followers WHERE follower_id=$[follower_id] and following_id=$[following_id]', id)
  },

  updateUser(user) {
    console.log(user)
    return db.one(`UPDATE users SET
                  pic = $/pic/,
                  blog_name = $/blog_name/,
                  blog_desc = $/blog_desc/
                  WHERE user_name=$/username/
                  RETURNING *`, user)
  },

  deleteUser(user) {
    return db.none('DELETE FROM users WHERE user_name=$1', user)
  },

  listFollowers(user) {
    return db.any('SELECT user_name, blog_name, pic FROM followers INNER JOIN users on follower_id = users.id WHERE following_id = $1',user)
  },

  returnID(user) {
    return db.any('SELECT id FROM users where user_name = $[user_name]', user)
  },

  checkFollowing(id) {
    return db.one('SELECT following_id FROM followers WHERE following_id=$[following_id] AND follower_id=$[follower_id]', id)
  },

  removePostsByUser(id) {
    return db.none(`DELETE FROM posts WHERE user_id=$1 `, id)
  },

  removeLikesByUser(id) {
    return db.none(`DELETE FROM likes WHERE user_id=$1`, id)
  },

  removeCommentsByUser(id) {
    return db.none(`DELETE FROM comments WHERE user_id=$1`, id)
  },

  removeFollowerByUser(id) {
    return db.none(`DELETE FROM followers WHERE following_id=$1 or follower_id=$1`, id)
  }

}
