const db = require('../db/config');

module.exports = {

  //return every card in the database
  populateFeed() {
    return db.any(`SELECT * from cards`);
  }

}
