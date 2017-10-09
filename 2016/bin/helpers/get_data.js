const request = require('request')

/**
 * Helper to wrap requesting/parsing JSON data from source
 *
 * @param {String} url
 *
 * @return {Promise}
 */
exports.getJson = url => (
  new Promise((resolve, reject) => {
    request(url, (err, response, body) => {
      if (err) {
        reject(err)
        return
      }
      if (response.statusCode !== 200) {
        reject(`HTTP: ${response.statusCode}`)
        return
      }
      try {
        const json = JSON.parse(body)
        resolve(json)
      } catch (parseErr) {
        reject(parseErr)
      }
    })
  })
)
