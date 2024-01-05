class ProductManager {
    constructor() {
      this.products = [];
      this.productIdCounter = 1;
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      if (!title || !description || price === undefined || !thumbnail || !code || stock === undefined) {
        console.error("Todos los campos son obligatorios.");
        return;
      }
  
      if (typeof price !== 'number') {
        console.error("El precio debe ser un número.");
        return;
      }
  
      if (typeof code !== 'string') {
        console.error("El código debe ser una cadena de texto.");
        return;
      }
  
      if (this.products.some(product => product.code === code)) {
        console.error("El código ya existe. Por favor, pruebe con otro.");
        return;
      }
  
      const newProduct = {
        id: this.productIdCounter++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      };
  
      this.products.push(newProduct);
      console.log("Producto agregado:", newProduct);
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const foundProduct = this.products.find(product => product.id === id);
  
      if (foundProduct) {
        console.log("Producto encontrado:", foundProduct);
      } else {
        console.error("Producto no encontrado. ID:", id);
      }
    }
  }
  
const productManager = new ProductManager();
  
productManager.addProduct("silla", "silla de madera", 10000, "imagen1.jpg", "A001", 5);
productManager.addProduct("mesa", "mesa de madera", 20000, "imagen2.jpg", "A002", 3);
productManager.addProduct("mueble", "mueble de madera", 45000, "imagen3.jpg", "A003", 4);
  
const allProducts = productManager.getProducts();
console.log("Todos los productos:", allProducts);
  
productManager.getProductById(2);
productManager.getProductById(4);