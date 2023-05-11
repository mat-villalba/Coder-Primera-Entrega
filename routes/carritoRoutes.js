import { Router } from "express";
import CartController from "../controllers/CartController.js";

const router = Router();
//const carts = new CartController('./carritos.json')

router.post("/", (_req, res) => {
  const cart = carts.createCart();
  res.status(200).send(cart);
});

router.get("/:cid", (req, res) => {
  const { cid } = req.params;
  const getCart = carts.getCartByID(cid);
  if (getCart.id) {
    res.status(200).send(getCart);
  } else {
    res.status(400).send(getCart);
  }
});

router.post("/:cid/product/:pid", (req, res) => {
  const { cid, pid } = req.params;
  const result = carts.addProductToCart(cid, pid);
  if (result.cart) {
    res.status(200).send(result);
  } else {
    res.status(400).send(result);
  }
});

export default router;
