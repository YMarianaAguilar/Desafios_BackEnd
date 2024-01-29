const express = require('express')
const ProductManager = require('./productManager')

const app = express()
let product = new ProductManager

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Bienvenidos al ecommerce')
})

app.get("/allproducts", async (req, res) => {
    let response = await product.allProducts()
    res.send(response)
})


app.listen(8080, () => {
    console.log('Server run on port 8080')
})