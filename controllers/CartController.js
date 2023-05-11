import fs from "fs";

class CartController {
  constructor(path) {
    this.path = path;
  }

  createCart() {
    const cartList = this.getData();
    const cart = { products: [] };

    if (cartList.length == 0) {
      cart.id = 1;
    } else {
      let lastIdItem = cartList[cartList.length - 1].id;
      cart.id = lastIdItem + 1;
    }

    cartList.push(cart);
    fs.writeFileSync(this.path, JSON.stringify(cartList, null, 2));
    return cart;
  }

  getCartByID(cid) {
    const cartList = this.getData();

    let searchCart = cartList.find((cart) => cart.id == cid);
    if (searchCart) {
      return searchCart;
    } else {
      return { err: `ID not found.` };
    }
  }

  addProductToCart(cid, pid) {
    const cartList = this.getData();

    let indexCart = cartList.findIndex((cart) => cart.id == cid);
    if (indexCart == -1) {
      return { err: `ID not found` };
    }

    let productIndex = cartList[indexCart].products.findIndex(
      (prod) => prod.id == pid
    );
    if (productIndex == -1) {
      const toAdd = { id: pid, quantity: 1 };

      cartList[indexCart].products.push(toAdd);
      fs.writeFileSync(this.path, JSON.stringify(cartList, null, 2));
      return { message: `added`, cart: cartList[indexCart].products };
    } else {
      cartList[indexCart].products[productIndex].quantity += 1;
      fs.writeFileSync(this.path, JSON.stringify(cartList, null, 2));
      return { message: `added`, cart: cartList[indexCart].products };
    }
  }

  getData() {
    let data = [];
    try {
      const productos = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      productos.forEach((elem) => {
        data.push(elem);
      });
    } catch {
      console.log(`Empty file or not found.`);
    }
    return data;
  }
}

export default CartController;
