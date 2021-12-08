import express from "express";
import fetch from "node-fetch";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const Product = mongoose.model("Product", {
  title: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  category: String,
  image: String,
});

const app = express();
app.use(express.json());

app.get("/products", async (req, res) => {
  const { term } = req.query;
  try {
    const products = await Product.find();
    if (term) {
      products = products.filter((product) =>
        product.title.toLowerCase().includes(term.toLocaleLowerCase())
      );
    }
    res.send(products);
  } catch (err) {
    throw err;
  }
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.send(product);
  } catch (err) {
    throw err;
  }
});

app.post("/products", async (req, res) => {
  const { title, category, price, image } = req.body;
  const product = new Product({ title, category, price, image });
  await product.save();
  res.send(product);
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = await Product.findByIdAndUpdate(id, body);
  res.send(product);
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    res.send({ msg: "Success" });
  } catch (err) {
    res.send({ msg: "Failed" });
  }
});

async function initProducts() {
  const productsFormDB = await Product.find();
  if (!productsFormDB.length) {
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();
    const mappedProducts = products.map((product) => ({
      ...product,
      id: null,
    }));
    await Product.insertMany(mappedProducts);
  }
}

const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;

mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`,
  (err) => {
    if (err) {
      console.log("ERROR");
    } else {
      console.log("SUCCESS");
    }
    initProducts();
    app.listen(process.env.PORT || 8000);
  }
);
