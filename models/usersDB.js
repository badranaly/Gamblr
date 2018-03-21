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

  followUser(user) {
    return db.one('INSERT INTO followers (follower_id, following_id) VALUES($[follower_id ], $[following_id]) RETURNING *', user)
  },

  unfollowUser(user) {
    return db.none('DELETE FROM followers WHERE follower_id=$[follower_id] and following_id=$[following_id]', user)
  },

  updateUser(user) {
    return db.one('UPDATE users SET password = $[password] WHERE user_name=$[user_name] RETURNING *', user)
  },

  deleteUser(user) {
    return db.none('DELETE FROM users WHERE user_name=$[user_name]', user)
  },

  listFollowers(user) {
    return db.any('SELECT user_name, blog_name FROM followers INNER JOIN users on following_id = users.id WHERE following_id = 1')
  }

}
