<h1 align="center"><b>PRODUCT APIs</b></h1>

#### **_POST_** - Create a new product - **_Admin_**

```
    http://localhost:5000/api/v1/product/new
```

```json
{
  "productTitle": "Hand Bag",
  "productDecription": "this is a sample product desc",
  "category": "bag",
  "subCategory": "Men's Bag",
  "price": 500,
  "discountedPrice": 350,
  "productImagesUrl": "sampleImageOfProduct3"
}
```

<br />

#### **_PUT_** - Update a product by id - **_Admin_**

```
    http://localhost:5000/api/v1/product/:productId
```

```json
{
  "productTitle": "Red bangle",
  "productDecription": "this is a sample product desc",
  "category": "bangle",
  "subCategory": "Glass Bangle",
  "price": 250,
  "discountedPrice": 199,
  "productImagesUrl": "sampleImageOfProduct1",
}
```

<br />

#### ***DELETE*** - Delete a product by id - ***Admin***

```
    http://localhost:5000/api/v1/product/:productId
```
<br />

#### **_GET_** - Get all product

```
    http://localhost:5000/api/v1/products
```
<br />

#### **_GET_** - Get single product details

```
        http://localhost:5000/api/v1/product/:id
```
<br />

<!-- Sample  -->
<!-- #### Heading
```
    http://localhost:5000/api/v1/
```
```json
```
<br /> -->
