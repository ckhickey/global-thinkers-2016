const path = require('path')
const directories = require('./helpers/directories')
const getData = require('./helpers/get_data')
const parseData = require('./helpers/parse_data')
const writeData = require('./helpers/write_data')
const sitemap = require('./helpers/sitemap')

const DATA_URL = 'https://foreignpolicy.com/r/api/global-thinkers/site/2016/'
const DATA_DIR = path.resolve(__dirname, '../src/app/data')
const DATA_TYPES = {
  categories: 'categories',
  entries: 'entries',
  pages: 'pages',
  nav: 'nav'
}

console.log('\n<<< {GT 2016 // Build} >>>\n')
const directoryPaths = Object.keys(DATA_TYPES).map(key => (
  path.resolve(DATA_DIR, DATA_TYPES[key])
))
/**
 * (1) Empty out base data directories (categories, entries, pages)
 */
directories.empty(directoryPaths)
  .then(() => {
    console.log('(*) Successfully reset data directories')
    /**
     * (2) Fetch and parse JSON data from WordPress VIP API endpoint
     */
    getData.getJson(DATA_URL)
      .then(json => {
        console.log('(*) Successfully fetched JSON data')
        const categoriesDir = path.resolve(DATA_DIR, DATA_TYPES.categories)
        const categories = parseData.getCategories(json)
        const entriesDir = path.resolve(DATA_DIR, DATA_TYPES.entries)
        const entries = parseData.getEntries(json)
        const navDir = path.resolve(DATA_DIR, DATA_TYPES.nav)
        const nav = [
          Object.assign({}, {id: 'burger_menu'}, parseData.getBurgerMenuData(json))
        ]
        const pagesDir = path.resolve(DATA_DIR, DATA_TYPES.pages)
        const pages = [
          Object.assign({}, {page: 'home'}, parseData.getHomeData(json)),
          Object.assign({}, {page: 'aarp'}, parseData.getAARPData(json))
        ]
        /**
         * (3) Write individual JSON files out
         */
        Promise.all([
          writeData.writeJsonAll(categoriesDir, categories, 'slug'),
          writeData.writeJsonAll(entriesDir, entries, 'slug'),
          writeData.writeJsonAll(navDir, nav, 'id'),
          writeData.writeJsonAll(pagesDir, pages, 'page'),
          writeData.writeFile(`${pagesDir}/sitemap.xml`, sitemap.generate(categories, entries))
        ])
          .then(() => {
            console.log('(*) Successfully wrote data')
            process.exit(0)
          })
          .catch(err => {
            console.error('(!) Error writing data', err)
            process.exit(1)
          })
      })
      .catch(err => {
        console.error('(!) Error fetching data', err)
        process.exit(1)
      })
  })
  .catch(err => {
    console.error('(!) Error emptying data directories', err)
    process.exit(1)
  })
