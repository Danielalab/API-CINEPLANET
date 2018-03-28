'use strict'

const express = require('express')
const productCtrl = require('../controllers/product')
const movieCtrl = require('../controllers/movies')
const userCtrl = require('../controllers/user')
const auth = require('../middleware/auth')
const api = express.Router()

api.get('/product', productCtrl.getProducts)
api.get('/product/:productId', productCtrl.getProduct)
api.post('/product', auth, productCtrl.saveProduct)
api.put('/product/:productId', productCtrl.updateProduct)
api.delete('/product/:productId', productCtrl.deleteProduct)
api.get('/movie', movieCtrl.getMovies)
api.get('/movie/:movieId', movieCtrl.getMovie)
api.post('/movie', auth, movieCtrl.saveMovie)
api.put('/movie/:movieId', movieCtrl.updateMovie)
api.delete('/movie/:productId', movieCtrl.deleteMovie)
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.get('/private', auth , (req, res) => {
    res.status(200).send({ message: 'Tienes acceso' })
})

module.exports = api