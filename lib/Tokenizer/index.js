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
