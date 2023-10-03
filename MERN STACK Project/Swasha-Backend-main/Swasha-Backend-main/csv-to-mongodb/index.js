const codeToURL = require("./codeToURL.json");
const mongoose = require("mongoose");
const ProdCSV = require("./parse-csv.js");
const fs = require("fs");

const productSchema = new mongoose.Schema(
  {
    productCode: {
      type: String,
      required: true,
    },
    productTitle: {
      type: String,
      required: [true, "Please enter the Product title"],
    },
    productDecription: {
      type: String,
      required: [true, "Please enter the Product Description"],
    },
    vtcCenter: {
      type: String,
    },
    colours: {
      type: Array,
    },
    // we can put as may as properties as key value pairs
    generalDetails: {
      type: Object,
    },
    price: {
      type: Number,
      required: [true, "Please enter the Product Price"],
      max: [1e8 - 1, "Please cannot exceed 8 characters"],
    },
    discountedPrice: {
      type: Number,
      required: [true, "Please enter the Product Discount"],
      max: [1e8 - 1, "Please cannot exceed 8 characters"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    productImagesUrl: [
      {
        type: String,
        required: [true, "Please enter the Product title"],
      },
    ],
    category: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    subCategory: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    stock: {
      type: Number,
      required: [true, "Please Enter product Stock"],
      max: [9999, "Stock cannot exceed 9999"],
      default: 1,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: false,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Export the model
const Product = mongoose.model("Product", productSchema);

function productCodeToId(code) {
  code = code
    .toLowerCase()
    .replace(/ /g, "")
    .split("")
    .map((x) => x.charCodeAt(0))
    .join("");
  while (code.length < 12) code += code;
  return code.slice(0, 12);
}

async function commitToDB(prods, cats, subs) {
  mongoose.set("strictQuery", false);
  mongoose.connect("mongodb://127.0.0.1:27017/swasha-ecom-api", async () => {
    console.log("connected");
    try {
      await Product.collection.drop();
      await Category.collection.drop();
      await SubCategory.collection.drop();
    } catch (e) {
      // console.error(e);
    }
    const sav1 = await Promise.all(prods.map((p) => p.save()));
    const sav2 = await Promise.all(cats.map((p) => p.save()));
    const sav3 = await Promise.all(subs.map((p) => p.save()));
    // console.log(sav);
    console.log("done");
  });
}

const catSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { versionKey: false }
);
const Category = mongoose.model(
  "productCategory",
  catSchema,
  "productCategories"
);
const subSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sellLimit: { type: Number, default: 20 },
  },
  { versionKey: false }
);
const SubCategory = mongoose.model(
  "productSubCategory",
  subSchema,
  "productSubCategories"
);

async function main() {
  const catDocs = {};
  const subDocs = {};
  function getCatDoc(name) {
    let cat = name.toLowerCase();
    if (
      cat.includes("bag") ||
      cat.includes("backpack") ||
      cat.includes("clutch") ||
      cat.includes("purse") ||
      cat.includes("pouch") ||
      cat.includes("sling")
    ) {
      name = "Bag";
    }
    if (cat.includes("hanging")) {
      name = "Hanging";
    }
    if (
      cat.includes("pen") ||
      cat.includes("file") ||
      cat.includes("envolape") ||
      cat.includes("sticker") ||
      cat.includes("canvas") ||
      cat.includes("key") ||
      cat.includes("candle")
    ) {
      name = "Stationary";
    }
    if (cat.includes("bangle") || cat.includes("ring")) {
      name = "Jewellery";
    }
    if (cat.includes("diyya") || cat.includes("diya")) {
      name = "Diya";
    }
    if (!(name in catDocs)) {
      catDocs[name] = new Category({ _id: productCodeToId(name), name });
    }
    return catDocs[name];
  }
  function getSubDoc(name) {
    if (!(name in subDocs)) {
      subDocs[name] = new SubCategory({ _id: productCodeToId(name), name });
    }
    return subDocs[name];
  }
  const pc = new ProdCSV();
  await pc.init("./products.csv");
  console.log(pc.rows[1]);
  let prods = [];
  for (let p of pc.rows) {
    let prodC = String(p["Product code"]).replaceAll(" ", "").toLowerCase();
    if (!prodC) continue;
    const prod = new Product({
      _id: productCodeToId(prodC),
      productCode: prodC,
      productTitle: p["Product title"].trim() || "None",
      productDecription: p["Description"].trim() || "None",
      price: p["Cost B2C"] || 0,
      material: p["material"].trim(),
      discountedPrice: p["Cost B2C"] || 0,
      productImagesUrl: [],
      category: getCatDoc(p["Category"].trim() || "None"),
      subCategory: getSubDoc(p["Sub-Category"].trim() || "None"),
      stock: p["Stock available"] || 0,
    });
    if (codeToURL[prodC]) {
      prod.productImagesUrl.push(...codeToURL[prodC]);
    }
    prod.ratings = 2.5 + Math.random() * 2.5;
    prods.push(prod);
  }
  prods = prods.map((x) => {
    return x;
  });
  fs.writeFileSync(
    "products.json",
    JSON.stringify(
      prods.map((x) => {
        x = x.toJSON();
        x._id = { $oid: x._id };
        x.category = { $oid: x.category };
        x.subCategory = { $oid: x.subCategory };
        return x;
      })
    )
  );
  fs.writeFileSync(
    "categories.json",
    JSON.stringify(
      Object.values(catDocs).map((x) => {
        x = x.toJSON();
        x._id = { $oid: x._id };
        return x;
      })
    )
  );
  fs.writeFileSync(
    "subCategories.json",
    JSON.stringify(
      Object.values(subDocs).map((x) => {
        x = x.toJSON();
        x._id = { $oid: x._id };
        return x;
      })
    )
  );
  // commitToDB(prods, Object.values(catDocs), Object.values(subDocs));
  console.log("done");
}

main();
