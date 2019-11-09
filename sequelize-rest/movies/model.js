const Sequelize = require("sequelize");
const db = require("../db");

const Movie = db.define(
  "movie",
  {
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
  },
  { tableName: "movies" }
);

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

Movie.truncate();
Movie.bulkCreate(theMovies);

module.exports = Movie;
