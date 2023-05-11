import { Router } from "express";
import ProductController from "../controllers/ProductController.js";

const router = Router();
//const productList = new ProductController('./src/productos.json')

router.get("/", (_req, res) => {
  res.status(200).send(productList.getProducts());
});

router.get("/:pid", (req, res) => {
  const { pid } = req.params;

  const result = productList.getProductByID(pid);

  if (result.id) {
    res.status(200).send(result);
  } else {
    res.status(400).send(result);
  }
});

router.post("/", (req, res) => {
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = req.body;
  if (
    !title ||
    !description ||
    !code ||
    !price ||
    !status ||
    !stock ||
    !category ||
    !thumbnails
  ) {
    throw new Error(`Incomplete data.`);
  }

  const product = {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  };
  const result = productList.addProduct(product);
  res.status(200).send(result);
});

router.put("/:pid", (req, res) => {
  const { pid } = req.params;
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = req.body;
  const result = productList.updateProduct(pid, {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  });

  if (result.err) {
    res.status(400).send(result);
  } else {
    res.status(200).send(result);
  }
});

router.delete("/:pid", (req, res) => {
  const { pid } = req.params;
  const result = productList.deleteProduct(pid);

  if (result.err) {
    res.status(400).send(result);
  } else {
    res.status(200).send(result);
  }
});

export default router;
