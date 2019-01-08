
const util = exports = module.exports = {}


util.safeParseJSON = (stringData) => {
  return new Promise((resolve, reject) => {
    try {
      const data = JSON.parse(stringData)
      resolve(data)
    } catch (error) {
      reject(error)
    }
  })
}