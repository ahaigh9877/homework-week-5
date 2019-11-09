const Sequelize = require("sequelize");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const jsonParser = bodyParser.json();
const port = 4000;

app.listen(port, console.log(`App listening on port ${port}.`));

app.use(jsonParser);

const databaseURl = "postgres://postgres:secret@localhost:5432/postgres";
const sequelize = new Sequelize(databaseURl);

const Movie = sequelize.define("movie", {
  title: {
    type: Sequelize.TEXT,
    field: "title"
  },
  yearOfRelease: {
    type: Sequelize.INTEGER,
    field: "year_of_release"
  },
  synopsis: {
    type: Sequelize.TEXT,
    field: "synopsis"
  }
});

const theMovies = [
  {
    title: "Edge of Tomorrow",
    yearOfRelease: 2014,
    synopsis:
      "A soldier fighting aliens gets to relive the same day over and over again, the day restarting every time he dies."
  },
  {
    title: "The Maze Runner",
    yearOfRelease: 2014,
    synopsis:
      "Thomas is deposited in a community of boys after his memory is erased, soon learning they're all trapped in a maze that will require him to join forces with fellow 'runners' for a shot at escape."
  },
  {
    title: "The Cabin in the Woods",
    yearOfRelease: 2011,
    synopsis:
      "Five friends go for a break at a remote cabin, where they get more than they bargained for, discovering the truth behind the cabin in the woods."
  }
];

sequelize
  .sync({ force: false })
  // .then(() => Movie.truncate())
  .then(() => {
    Promise.all(Movie.bulkCreate(theMovies)).catch(console.error);
  })
  .then(console.log("Database synced."))
  .catch(error => console.error(error));

// C reate endpoint
app.post("/movies", (req, res, next) => {
  Movie.create(req.body)
    .then(movie => res.status(200).send(movie))
    .catch(next);
});

// R eceive-all endpoint
app.get("/movies", (req, res, next) => {
  Movie.findAll()
    .then(movies => res.status(200).send(movies))
    .catch(next);
});

// R eceive-one endpoint
app.get("/movies/:movieId", (req, res, next) => {
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
app.put("/movies/:movieId", (req, res, next) => {
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
app.delete("/movies/:movieId", (req, res, next) => {
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
app.delete("/movies", (req, res, next) => {
  Movie.destroy({
    where: {},
    truncate: true
  })
    .then(res.status(204).end())
    .catch(next);
});
