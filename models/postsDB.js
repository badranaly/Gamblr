const db = require('../db/config');

module.exports = {

  //return every card in the database
  populateFeed() {
    return db.any(`SELECT *
                  FROM followers
                  INNER JOIN posts ON followers.following_id = posts.user_id
                  INNER JOIN users ON users.id = followers.following_id
                  WHERE followers.follower_id = 1`);
  },
  addLike() {
    return db.one('INSERT ')
  },
  removeLike() {

  },


}
