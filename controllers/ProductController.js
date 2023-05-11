import fs from "fs";

class ProductController {
  constructor(path) {
    this.path = path;
  }

  addProduct({
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnails = [],
  }) {
    const productList = this.getData();

    if (productList.length != 0) {
      let verifyCode = productList.find((product) => product.code == code);
      if (verifyCode) {
        return `Code already exists.`;
      }
    }

    let product = {
      id:
        productList.length == 0
          ? 1
          : productList[productList.length - 1].id + 1,
      title,
      description,
      code,
      price,
      status: true,
      stock,
      category,
      thumbnails,
    };

    productList.push(product);
    fs.writeFileSync(this.path, JSON.stringify(productList, null, 4));
    return product;
  }

  getProducts() {
    return this.getData();
  }

  getProductByID(id_prod) {
    let productList = this.getData();

    let searchProduct = productList.find((product) => product.id == id_prod);
    if (searchProduct) {
      return searchProduct;
    } else {
      return { err: `Product ID not found.` };
    }
  }

  deleteProduct(id_prod) {
    let productList = this.getData();

    let indexProduct = productList.findIndex(
      (product) => product.id == id_prod
    );

    if (indexProduct >= 0) {
      productList.splice(indexProduct, 1);
      fs.writeFileSync(this.path, JSON.stringify(productList, null, 3));
      return { message: `The product was successfully deleted.` };
    } else {
      return { err: `Product not found in the list.` };
    }
  }

  getData() {
    let data = [];
    try {
      const carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      carts.forEach((elem) => {
        data.push(elem);
      });
    } catch {
      console.log(`Empty file or not found.`);
    }
    return data;
  }
}

export default ProductController;
