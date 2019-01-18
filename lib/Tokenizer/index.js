const crypto = require('crypto')
const util = require('util')

const config = require('../config')

const rndNum = util.promisify(crypto.randomBytes)


/**
 * Creates auth tokens, use login email
 */
exports.createRandomHash = async (toHash) => {
  try {
    const rand = await rndNum(64)
    const hash = await crypto
      .createHash(config.crypto.algo)
      .update(toHash)
      .update(rand)
      .digest('hex')

    return hash

  } catch (error) {
    throw new Error('Some error happened while creating token')
  }

}



/**
 * This is the hashing function for the User id
 */
exports.createUserId = (email) => new Promise((resolve, reject) => {
  const hmac = crypto.createHmac('sha1', config.crypto.secretSauce)

  hmac.on('readable', () => {
    const data = hmac.read()

    if (data) {
      resolve(data)
    } else {
      reject('')
    }
  })

  hmac.write(email)
  hmac.end()
})



/**
 * This can be used for other id's
 */
exports.createObjectId = () => new Promise((resolve, reject) => {
  crypto.randomBytes(20, (err, buff) => {
    if (err) return reject(err)

    const uid = buff.toString('hex')
    resolve(uid)
  })
})
