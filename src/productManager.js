const fs = require("fs").promises;

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.productIdCounter = 1;

    this.loadProducts();
  }

  async loadProducts() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      this.products = JSON.parse(data);
      if (this.products.length > 0) {
        const maxId = Math.max(...this.products.map((product) => product.id));
        this.productIdCounter = maxId + 1;
      }
    } catch (error) {
      this.products = [];
    }
  }

  async saveProducts() {
    try {
      const data = JSON.stringify(this.products, null, 2);
      await fs.writeFile(this.path, data, "utf-8");
    } catch (error) {
      console.error("Error al guardar productos en el archivo:", error.message);
    }
  }

  addProduct(productData) {
    // Validar propiedades obligatorias
    const requiredProperties = [
      "title",
      "description",
      "price",
      "thumbnail",
      "code",
      "stock",
    ];
    for (const prop of requiredProperties) {
      if (!productData[prop]) {
        console.error(`Error: La propiedad "${prop}" es obligatoria.`);
        return null;
      }
    }

    // Verificar que el código no esté duplicado
    const isCodeDuplicate = this.products.some(
      (product) => product.code === productData.code
    );
    if (isCodeDuplicate) {
      console.error(
        `Error: El código "${productData.code}" ya está en uso por otro producto.`
      );
      return null;
    }

    // Crear el nuevo producto
    const newProduct = {
      id: this.productIdCounter++,
      ...productData,
    };

    // Agregar el nuevo producto
    this.products.push(newProduct);
    this.saveProducts();
    console.log("Producto agregado:", newProduct);

    return newProduct;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const foundProduct = this.products.find((product) => product.id === id);

    if (foundProduct) {
      console.log("Producto encontrado:", foundProduct);
    } else {
      console.error("Producto no encontrado. ID:", id);
    }

    return foundProduct;
  }

  updateProduct(id, updatedFields) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index !== -1) {
      this.products[index] = {
        ...this.products[index],
        ...updatedFields,
      };

      this.saveProducts();
      console.log("Producto actualizado:", this.products[index]);
      return this.products[index];
    } else {
      console.error("Producto no encontrado. ID:", id);
      return null;
    }
  }

  deleteProduct(id) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index !== -1) {
      const deletedProduct = this.products.splice(index, 1)[0];
      this.saveProducts();
      console.log("Producto eliminado:", deletedProduct);
      return deletedProduct;
    } else {
      console.error("Producto no encontrado. ID:", id);
      return null;
    }
  }
}

// const productManager = new ProductManager("productos.json");

// productManager.addProduct({
//   title: "Silla",
//   description: "Silla de madera",
//   price: 10000,
//   thumbnail: "imagen1.jpg",
//   code: "A001",
//   stock: 5,
// });

// productManager.addProduct({
//   title: "Mesa",
//   description: "Mesa de madera",
//   price: 20000,
//   thumbnail: "imagen2.jpg",
//   code: "A002",
//   stock: 3,
// });

// const allProducts = productManager.getProducts();
// console.log("Todos los productos:", allProducts);

// const productIdToUpdate = 2;
// const updatedProduct = productManager.updateProduct(productIdToUpdate, {
//   price: 25000,
//   stock: 4,
// });

// const productIdToDelete = 1;
// productManager.deleteProduct(productIdToDelete);

module.exports = ProductManager;
