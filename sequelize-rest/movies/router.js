const express = require("express");
const { Router } = express;
const router = new Router();

const Movie = require("./model");

// C reate endpoint
router.post("/movies", (req, res, next) => {
  Movie.create(req.body)
    .then(movie => res.status(200).send(movie))
    .catch(next);
});

// R eceive-all endpoint
router.get("/movies", (req, res, next) => {
  Movie.findAll()
    .then(movies => res.status(200).send(movies))
    .catch(next);
});

// R eceive-one endpoint
router.get("/movies/:movieId", (req, res, next) => {
  const movieId = req.params.movieId;
  Movie.findByPk(movieId)
    .then(movie => {
      if (movie) {
        res.status(200).json(movie);
      } else {
        res.status(404).end();
      }
    })
    .catch(err => next(err));
});

// U pdate endpoint
router.put("/movies/:movieId", (req, res, next) => {
  const movieId = req.params.movieId;
  Movie.findByPk(movieId)
    .then(movie => {
      if (movie) {
        movie.update(req.body).then(movie => res.status(200).json(movie));
      } else {
        res.status(404).end();
      }
    })
    .catch(err => next(err));
});

// D elete-one endpoint
router.delete("/movies/:movieId", (req, res, next) => {
  const movieId = req.params.movieId;
  Movie.destroy({
    where: {
      id: movieId
    }
  })
    .then(nrDeleted => {
      if (nrDeleted) {
        res.status(204).end();
      } else {
        res.status(404).end();
      }
    })
    .catch(next);
});

// D elete-all endpoint
router.delete("/movies", (req, res, next) => {
  Movie.destroy({
    where: {},
    truncate: true
  })
    .then(res.status(204).end())
    .catch(next);
});

module.exports = router;
