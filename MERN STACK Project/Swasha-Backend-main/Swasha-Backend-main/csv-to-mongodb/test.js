const mongoose = require("mongoose");
const Product = require("../server/src/models/productModel");

const sch = new mongoose.Schema({ name: { type: String } });
const Mod = mongoose.model("Mod", sch);

async function test() {
  mongoose.set("strictQuery", false);
  const db = await mongoose.connect("mongodb://127.0.0.1:27017/swasha");
  const doc = new Mod({ name: "ano" });
  console.log((await Mod.find({ name: "ano" })).length);
  await doc.save();
  console.log((await Mod.find({ name: "ano" })).length);
  await new Product({
    productTitle: "Hanging",
    productDecription:
      "This is a handmade, durable, beads hanging. This is perfect to use for door entrances at home and offices.",
    colours: [],
    price: 150,
    discountedPrice: 150,
    ratings: 0,
    productImagesUrl: [],
    category: "64096553a42861bbf03b24cf",
    subCategory: "64096553a42861bbf03b24dd",
    stock: 2,
    numOfReviews: 0,
    reviews: [],
  }).save();
  console.log("done");
}
test();
