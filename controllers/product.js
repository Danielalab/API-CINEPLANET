'use strict'

const Product = require('../models/product')

function getProduct(req, res) {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send({message: `error al realizar la peticion ${err}`})
    if (!product) return res.status(404).send({message: 'El producto no existe'})

    res.status(200).send({ product })
  })
}

function getProducts(req, res) {
  Product.find({}, (err, products) => {
    if(err) return res.status(500).send({message: `error al realizar la peticion ${err}`})
    if(!products) return res.status(404).send({message:'No existen productos'})
    res.status(200).send({ products }) 
  })
}

function saveProduct(req, res) {
  let product = new Product()
  product.location = req.body.location
  product.name = req.body.name
  product.movies = req.body.movies.replace(/\'?/gi, '').split(',')
  product.type = req.body.type.replace(/\'?/gi, '').split(',')
  product.prices = JSON.parse(req.body.prices)
  product.seats = req.body.seats 

  product.save((err, productStored) => {
    if (err) res.status(500).send({ message: `error al salvar la base de datos: ${err}`})

    res.status(200).send({ product: productStored })
  })
}

function updateProduct(req, res) {
  let productId = req.params.productId
  let update = req.body
  
  Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
    if(err)  res.status(500).send({message: `Èrror al actualizar producto ${err}`})

    res.status(200).send({product: productUpdated})
  })
}

function deleteProduct(req, res) {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if(err) res.status(500).send({message: `Error al borrar producto ${err}`})

    product.remove( err => {
      if(err) res.status(500).send({message: `Error al borrar el producto: ${err}`})
      res.status(200).send({message: 'El producto ha sido eliminado'})
    })
  })
}

module.exports = {
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct
}