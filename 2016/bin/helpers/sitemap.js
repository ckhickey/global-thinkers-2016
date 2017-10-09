const builder = require('xmlbuilder')

const BASE_URL = 'https://gt.foreignpolicy.com/2016/'

/**
 * Helper to get relative URL string based on type of item
 *
 * @param {Object} item
 *
 * @return {String}
 */
const getRelUrlPrefix = item => {
  switch (item.type) {
    case 'essay':
      return `essay`
    case 'thinker':
      return `profile`
    default:
      return `category`
  }
}

/**
 * Helper to generate one big sitemap
 *
 * @param {Array} categories
 * @param {Array} entries
 *
 * @return {String}
 */
exports.generate = (categories, entries) => {
  const urls = categories.concat(entries).map(item => ({
    loc: `${BASE_URL}${getRelUrlPrefix(item)}/${item.slug}`
  }))
  const urlset = {
    urlset: {
      '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
      url: [{loc: `${BASE_URL}`}].concat(urls)
    }
  }
  return builder
    .create(urlset, {encoding: 'UTF-8'})
    .end()
}
