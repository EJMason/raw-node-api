
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

util.color = {}

const colorCodes = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[43m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m'
}

Object.keys(colorCodes)
  .forEach(color => {
    util.color[color] = (txt) =>
      `${colorCodes[color]}${txt}${colorCodes.reset}`
  })
