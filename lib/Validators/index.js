const typing = require('./typing')


module.exports.objectHasAllProperties = function(obj) {
  let hasProperties = true
  for(let i = 1; i < arguments.length; i++) {
    if (!obj.hasOwnProperty(arguments[i])) {
      hasProperties = false
    }
  }
  return hasProperties
}

module.exports.typing = typing
