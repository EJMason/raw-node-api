


module.exports.objectHasAllProperties = function(obj) {
  let hasProperties = true
  for(let i = 0; i < arguments.length; i++) {
    if (!obj.hasOwnProperty(arguments[i])) {
      hasProperties = false
    }
  }
  return hasProperties
}

module.exports = [
  'Arguments',
  'Function',
  'String',
  'Number',
  'Date',
  'RegExp'
].reduce( (obj, name) => {
  obj[ 'is' + name ] = x => toString.call(x) == '[object ' + name + ']';
  return obj;
}, {});