const _ = require('lodash')

/**
 * Helper to determine if entry is essay
 *
 * @param {Object} essay
 *
 * @return {Boolean}
 */
const isEssay = entry => entry.type === 'essay'

/**
 * Helper to determine if entry is thinker
 *
 * @param {Object} essay
 *
 * @return {Boolean}
 */
const isThinker = entry => entry.type === 'thinker'

/**
 * Grab global site meta
 *
 * @param {Object} data
 *
 * @return {Object}
 */
const getSiteMeta = data => ({
  site_meta: Object.assign({}, data.meta, {
    site_title: data.title
  })
})

/**
 * Get all categories associated with a site
 *
 * @param {Object} json
 *
 * @return {Array}
 */
const getCategories = json => {
  const {data} = json
  return (data.categories || []).map(category => (
    Object.assign({}, category, getSiteMeta(data))
  ))
}

/**
 * Get associated entries for a category
 *
 * @param {Object} category
 *
 * @return {Array}
 */
const getCategoryEntries = category => (
  (category.entries || []).map(entry => (
    Object.assign({}, entry, {
      category_slug: category.slug,
      category_title: category.title,
      site_meta: category.site_meta
    })
  ))
)

/**
 * Get min data set for cat landing
 *
 * @param {Object} entry
 *
 * @return {Object}
 */
const getPartial = entry => (
  isThinker(entry)
    ? getPartialThinker(entry)
    : getPartialEssay(entry)
)

/**
 * Get partial essay data, for landing pages
 *
 * @param {Object}
 *
 * @return {Object}
 */
const getPartialEssay = essay => (
  _.pick(essay, [
    'type',
    'id',
    'title',
    'slug',
    'crop_image',
    'dek'
  ])
)

/**
 * Get partial thinker data, for landing pages
 *
 * @param {Object}
 *
 * @return {Object}
 */
const getPartialThinker = thinker => (
  _.pick(thinker, [
    'type',
    'id',
    'name',
    'slug',
    'crop_image',
    'profession',
    'dek',
    'reason'
  ])
)

/**
 * Bare minimum data set from thinker object
 *
 * @param {Object} essay
 *
 * @return {Object}
 */
const getEssayForNav = essay => (
  _.pick(essay, [
    'id',
    'title',
    'dek',
    'image',
    'authors'
  ])
)

/**
 * Bare minimum data set from thinker object
 *
 * @param {Object} thinker
 *
 * @return {Object}
 */
const getThinkerForNav = thinker => (
  _.pick(thinker, [
    'id',
    'slug',
    'name'
  ])
)

/**
 * Bare minimum data set from category object
 *
 * @param {Object} category
 *
 * @return {Object}
 */
const getCategoryForNav = category => (
  _.pick(category, [
    'title',
    'slug'
  ])
)

/**
 * Bare minimum data set from category object for home
 *
 * @param {Object} category
 *
 * @return {Object}
 */
const getCategoryForHome = category => (
  _.pick(category, [
    'title',
    'slug',
    'image',
    'body'
  ])
)

/**
 * Helper to get cat info for burger menu
 *
 * @param {Object} json
 *
 * @return {Array}
 */
const getCategoriesForNav = json => (
  getCategories(json).map(category => (
    Object.assign({}, getCategoryForNav(category), {
      entries: getCategoryEntries(category)
        .filter(isThinker)
        .map(getThinkerForNav)
    })
  ))
)

/**
 * Helper to retrieve all category data, including sub-entry partial data
 *
 * @param {Object} json
 *
 * @return {Array}
 */
exports.getCategories = json => (
  getCategories(json).map(category => (
    Object.assign({}, category, {
      entries: getCategoryEntries(category)
        .filter(isThinker)
        .map(getPartial)
    })
  ))
)

/**
 * Helper to retrieve list of all entries (thinkers/essays) from JSON data
 *
 * @param {Object} json
 *
 * @return {Array}
 */
exports.getEntries = json => (
  getCategories(json)
    .map(getCategoryEntries)
    .reduce((acc, entries) => acc.concat(entries), [])
)

/**
 * Grab data needed ƒor burger menu
 *
 * @param {Object} json
 *
 * @return {Object}
 */
exports.getBurgerMenuData = json => ({
  categories: getCategoriesForNav(json),
  essays: this.getEntries(json)
    .filter(isEssay)
    .map(getEssayForNav)
})

/**
 * Grab data needed ƒor home page
 *
 * @param {Object} json
 *
 * @return {Object}
 */
exports.getHomeData = json => {
  const {data} = json
  const categories = data.categories || []
  return _.omit(Object.assign({}, data, {
    categories: categories.map(getCategoryForHome)
  }), [
    '_custom_data'
  ])
}

/**
 * Grab data needed ƒor AARP page
 *
 * @param {Object} json
 *
 * @return {Object}
 */
exports.getAARPData = json => {
  const {data} = json
  return {data: data._custom_data}
}
