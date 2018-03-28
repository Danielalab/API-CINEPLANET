'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MovieSchema = Schema({
    name: String,
    img: String, 
    description: String,
    director: String,
    language: Array,
    roomType: String,
    roomNumb: String,
    schedule: Array
})

module.exports = mongoose.model('Movie', MovieSchema)