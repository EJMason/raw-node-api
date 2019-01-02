const crypto = require('crypto')

const config = require('../config')


exports.createToken = async (toHash, sauce = config.crypto.secretSauce) => {
  try {
    const hmac = crypto.createHmac(config.crypto.algo, sauce)
    const hash = await hmac.update(toHash).digest('hex')
    return hash

  } catch (error) {
    throw new Error('Some error happened while creating token')
  }

}