const fs = require('fs')
const path = require('path')

// const myUtils = require('../utils/index')

/**
 * Check if a directory exists already
 */
module.exports.directoryExists = (directory) => new Promise((resolve, reject) => {
  fs.access(directory, fs.constants.F_OK, err => {
    if (err.code === 'ENOTDIR') {
      resolve(false)
    } else if (err) {
      reject(err)
    } else {
      resolve(true)
    }
  })
})



/**
 * Check if a file Exists or not
 */
module.exports.fileExists = (filePath) => new Promise((resolve, reject) => {
  fs.access(filePath, fs.constants.F_OK, err => {
    if (err && err.code === 'ENOENT') {
      return resolve(false)
    } else if (err) {
      return reject(err)
    } else {
      return resolve(true)
    }
  })
})



module.exports.createEntry = (tableName, filename, dataToWrite) =>  new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, '../../.data', tableName)
    const fullpath = `${filePath}/${filename}.json`

    fs.open(fullpath, 'wx', (err, fileDescriptor) => {
      if (!err && fileDescriptor) {

        fs.writeFile(fileDescriptor, dataToWrite, err => {
          if (!err) {
            fs.close(fileDescriptor, err => {
              if (!err) return resolve(dataToWrite)
              return reject(err)
            })
          } else {
            reject(err)
          }
        })
      } else {
        return reject(err)
      }
    })
})
