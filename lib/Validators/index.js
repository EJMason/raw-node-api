
exports.sanityChecker = function(data) {

  // TODO: throw an error is data dne
  const obj = {}

  obj.bool = true
  obj.data = data

  obj.isString = () => {
    if(typeof obj.data !== 'string') {
      obj.bool = false
    }
    return obj
  }

  obj.isNumber = () => {
    if(typeof obj.data !== 'number') {
      obj.bool = false
    }
    return obj
  }

  obj.validate = () => obj.bool

  return obj

}
