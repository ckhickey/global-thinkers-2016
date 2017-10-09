const async = require('async')
const fs = require('fs-extra')

/**
 * Helper to empty/reset directories before (re)populating w/ JSON from
 * the server
 *
 * @param {Array} directories
 *
 * @return {Promise}
 */
exports.empty = directories => (
  new Promise((resolve, reject) => {
    async.each(directories, (directory, callback) => (
      fs.emptyDir(directory, err => (
        err ? callback(directory) : callback()
      ))
    ), err => (
      err ? reject(err) : resolve()
    ))
  })
)
