const express = require("express");
const ProductManager = require("./Products/products.json");

const app = express();
const PORT = process.env.PORT || 3000;

const productManager = new ProductManager("productos.json");

app.use(express.json());

app.get("/Products/products.json", (req, res) => {
  try {
    let limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const products = productManager.getProducts(limit);
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/Products/products.json", (req, res) => {
  try {
    const newProduct = productManager.addProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/Products/products.json:id", (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = productManager.updateProduct(productId, req.body);
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/Products/products.json:id", (req, res) => {
  try {
    const productId = req.params.id;
    productManager.deleteProduct(productId);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
