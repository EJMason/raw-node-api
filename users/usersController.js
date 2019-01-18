const path = require('path')

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
    uid = id.toString('hex')
    return orm.ormUtils.fileExists(path.join(__dirname, '../.data/users/', `${uid}.json`))
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
  orm
    .ormUtils
    .createEntry('users', uid, user)
      .then(resolve)
      .catch(reject)
})