const connectDB = require('./src/config/database')
const Product = require('./src/models/productModel')
const { MeiliSearch } = require('meilisearch')
require('dotenv').config()

const meiliSettings = {
  searchableAttributes: ['productTitle', 'productDescription'],
  sortableAttributes: ['mrp', 'ratings', 'createdAt'],
  filterableAttributes: ['category', 'subCategory', 'sellingPrice','stock'],
  rankingRules: [
    'sort',
    'words',
    'typo',
    'proximity',
    'attribute',
    'exactness'
  ],
  typoTolerance: {
    enabled: true,
    minWordSizeForTypos: {
      oneTypo: 3,
      twoTypos: 10,
    },
    disableOnWords: [],
    disableOnAttributes: [],
  }
}

const meiliClient = new MeiliSearch({
  host: 'http://localhost:7700',
  apiKey: process.env.MEILISEARCH_KEY
})

async function init() {
  await connectDB()
  const docs = await Product.find(
    { 'productImagesUrl.1': { $exists: true } },
    {
      _id: 1,
      productTitle: 1,
      productDecription: 1,
      category: 1,
      subCategory: 1,
      sellingPrice: 1,
      ratings: 1,
      createdAt: 1,
      stock:1,
    }
  )
  await meiliClient.deleteIndex('products')
  await meiliClient.createIndex('products')
  const prodIndex = meiliClient.index('products')
  await prodIndex.updateSettings(meiliSettings)
  console.log(await prodIndex.getSettings())
  await prodIndex.addDocuments(docs)
  process.exit()
}

init()
