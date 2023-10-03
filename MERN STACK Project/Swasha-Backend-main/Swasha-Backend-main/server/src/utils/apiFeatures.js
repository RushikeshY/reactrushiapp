/**
 * queryObject:
 *  page: page number
 *  resultsPerPage: results per page
 *  sortBy: key name by which results are to be sorted
 *  sortOrder: 1 for ascending -1 for descending
 *  keyword: case insensitive $regex search in productTitle
 */

class ApiFeatures {
  constructor(query, queryObject) {
    this.query = query
    this.queryObject = queryObject
  }

  // Search Functionality
  search() {
    const keyword = this.queryObject.keyword
      ? {
          productTitle: {
            $regex: this.queryObject.keyword,
            $options: 'i', // using "i" means case in sensitive :- you can search in mongoDb doc.
          },
        }
      : {}

    this.query = this.query.find({ ...keyword })
    return this
  }

  // Filter Functionality
  filter() {
    const filterObject = {}

    // Allowed keys to filter
    const keepFields = [
      'productTitle',
      'price',
      'category',
      'subCategory',
      'stock',
      'ratings',
    ]
    keepFields.forEach((key) => {
      if (this.queryObject[key] !== undefined) {
        filterObject[key] = this.queryObject[key]
      }
    })
    this.query = this.query.find({
      ...filterObject,
      productImagesUrl: { $not: { $size: 0 } },
    })
    return this
  }

  // pagination
  pagination() {
    const resultsPerPage = this.queryObject.resultsPerPage || 10
    const currentPage = Number(this.queryObject.page) || 1

    const skip = resultsPerPage * (currentPage - 1)

    this.query = this.query.limit(resultsPerPage).skip(skip)

    return this
  }

  sort() {
    if (!this.queryObject.sortBy) return this
    this.query.sort({
      [this.queryObject.sortBy]: this.queryObject.sortOrder || 1,
    })
    return this
  }
}

module.exports = ApiFeatures
