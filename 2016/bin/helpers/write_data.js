const async = require('async')
const fscore = require('fs')
const fs = require('fs-extra')
const path = require('path')

/**
 * Helper to write list of data to individual files based on key
 *
 * @param {String} baseDir
 * @param {Array} listOfData
 * @param {String} key
 *
 * @return {Promise}
 */
exports.writeJsonAll = (baseDir, listOfData, key) => (
  new Promise((resolve, reject) => {
    async.each(listOfData, (data, callback) => {
      const basename = data[key]
      if (!basename) {
        callback('Key error')
        return
      }
      const file = path.resolve(baseDir, `${basename}.json`)
      fs.writeJson(file, data, {spaces: 0}, err => (
        err ? callback(err) : callback()
      ))
    }, err => (
      err ? reject(err) : resolve()
    ))
  })
)

/**
 * Simple promise wrapper for file writes
 *
 * @param {String} filename
 * @param {String} content
 *
 * @return {Promise}
 */
exports.writeFile = (filename, content) => {
  return new Promise((resolve, reject) => {
    fscore.writeFile(filename, content, err => (
      err ? reject(err) : resolve()
    ))
  })
}
