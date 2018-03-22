const db = require('../db/config');

module.exports = {

  createUser(user) {
    return db.one(`INSERT INTO users (user_name, password, pic, bg, blog_name, blog_desc)
                    VALUES ($[user_name], $[password], $[pic], $[bg], $[blog_name], $[blog_desc]) RETURNING *`, user);
  },

  findUser(user){
    return db.one(`SELECT * FROM users WHERE user_name = $[user_name]`, user)
  },

  authenticate(user){
    return db.one(`SELECT * FROM users WHERE user_name = $[user_name] AND password = $[password]`, user)
  },

  listFollowing(user) {
    return db.many('SELECT user_name, blog_name, pic FROM followers INNER JOIN users ON following_id = users.id WHERE follower_id = 1')
  },

  changePass(user){
    return db.none(`UPDATE users SET password=$[password] WHERE user_name='testuser'`, user)
  },

  followUser(user) {
    return db.one('INSERT INTO followers (follower_id, following_id) VALUES(1, $[following_id]) RETURNING *', user)
  },

  unfollowUser(id) {
    return db.none('DELETE FROM followers WHERE follower_id=1 and following_id=$[following_id]', id)
  },

  updateUser(user) {
    console.log(user)
    return db.one(`UPDATE users SET
                  user_name = $/user_name/,
                  pic = $/pic/,
                  bg = $/bg/,
                  blog_name = $/blog_name/,
                  blog_desc = $/blog_desc/
                  WHERE user_name='testuser'
                  RETURNING *`, user)
  },

  deleteUser(user) {
    return db.none('DELETE FROM users WHERE user_name=$1', user)
  },

  listFollowers(user) {
    return db.any('SELECT user_name, blog_name, pic FROM followers INNER JOIN users on follower_id = users.id WHERE following_id = 1')
  },

  returnID(user) {
    return db.any('SELECT id FROM users where user_name = $[user_name]', user)
  },

  checkFollowing(id) {
    return db.one('SELECT following_id FROM followers WHERE following_id=$[following_id] AND follower_id=1', id)
  }

}
