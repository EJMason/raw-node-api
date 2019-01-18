const tokenizer = require('../lib/Tokenizer')
const orm = require('../lib/textORM')

/**
 *
 */
module.exports.checkIfUserExists = (email) => new Promise((resolve, reject) => {
  // first check if the user exists
  let uid = ''
  tokenizer.createUserId(email)
  .then(id => {
    uid = id
    return orm.ormUtils.fileExists(uid)
  })
  .then(idExists => {
    if (idExists) {
      return resolve(false)
    }
    resolve(uid)
  })
  .catch(reject)



})


/**
 * Add new user to the database
 */
module.exports.createNewUser = (uid, user) => new Promise((resolve, reject) => {
  
})