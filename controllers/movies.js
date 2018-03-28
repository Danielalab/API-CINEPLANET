'use strict'

const Movie = require('../models/movies')

function getMovie(req, res) {
  let movieId = req.params.movieId

  Movie.findById(movieId, (err, movie) => {
    if (err) return res.status(500).send({message: `error al realizar la peticion ${err}`})
    if (!movie) return res.status(404).send({message: 'La pelicula no existe'})

    res.status(200).send({ movie })
  })
}

function getMovies(req, res) {
  Movie.find({}, (err, movies) => {
    if(err) return res.status(500).send({message: `error al realizar la peticion ${err}`})
    if(!movies) return res.status(404).send({message:'No existen peliculas'})
    res.status(200).send({ movies }) 
  })
}

function saveMovie(req, res) {
  let movie = new Movie()
  movie.name = req.body.name
  movie.imgV = req.body.imgV
  movie.imgH = req.body.imgH  
  movie.description = req.body.description
  movie.director = req.body.director
  movie.language = req.body.language.replace(/\'?/gi, '').split(',')
  movie.roomType = req.body.roomType 
  movie.roomNumb = req.body.roomNumb
  movie.schedule = req.body.schedule.replace(/\'?/gi, '').split(',') 

  movie.save((err, movieStored) => {
    if (err) res.status(500).send({ message: `error al salvar la base de datos: ${err}`})

    res.status(200).send({ movie: movieStored })
  })
}

function updateMovie(req, res) {
  let movieId = req.params.movieId
  let update = req.body
  
  Movie.findByIdAndUpdate(movieId, update, (err, movieUpdated) => {
    if(err)  res.status(500).send({message: `Èrror al actualizar la pelicula ${err}`})

    res.status(200).send({ movie: movieUpdated })
  })
}

function deleteMovie(req, res) {
  let movieId = req.params.movieId
  
  Movie.findById(movieId, (err, movie) => {
    if(err) res.status(500).send({message: `Error al borrar la pelicula ${err}`})
  
    movie.remove( err => {
      if(err) res.status(500).send({message: `Error al borrar la pelicula: ${err}`})
      res.status(200).send({message: 'la pelicula ha sido eliminado'})
    })
  })
}

module.exports = {
    getMovie,
    getMovies,
    saveMovie,
    updateMovie,
    deleteMovie
}