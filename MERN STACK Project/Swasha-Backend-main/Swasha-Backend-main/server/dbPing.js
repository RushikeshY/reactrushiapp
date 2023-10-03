const connectDB = require('./src/config/database')
const ProductCategory = require('./src/models/ProductCategoryModel')
async function init() {
  let t = Date.now()
  await connectDB()
  console.log(`ConnectDB: ${Date.now() - t}ms`)
  t = Date.now()
  let d = []
  for (let i = 0; i < 10; i++) {
    let cat = await ProductCategory.find({})
    let del = Date.now() - t
    d.push(del)
    console.log(`Iter#${i}: ${del}ms`)
  }
  console.log(`AveragePing: ${d.reduce((a, b) => a + b, 0) / d.length}ms`)
  process.exit()
}

init()
