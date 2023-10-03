mongoimport --uri $1 --collection products --jsonArray --file products.json
mongoimport --uri $1 --collection productCategories --jsonArray --file categories.json
mongoimport --uri $1 --collection productSubCategories --jsonArray --file subCategories.json
