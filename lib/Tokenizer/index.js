const crypto = require('crypto')

const config = require('../config')


const hmac = crypto.createHmac('algo', 'secretSauce')

exports.create