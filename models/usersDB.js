const db = require('../db/config');

module.exports = {

  //return every card in the database
  createUser(user) {
    return db.one(`INSERT INTO users (user_name, password, pic, bg, blog_name, blog_desc)
                    VALUES ($[user_name], $[password], $[pic], $[bg], $[blog_name], $[blog_desc]) RETURNING *`, user);
  },
  authenticate(user){
        return db.one(`SELECT * FROM users WHERE user_name = $[user_name] AND password = $[password]`, user)
  }



}
