const express = require("express");
const bodyParser = require("body-parser");

const router = require("./movies/router");

const app = express();
const jsonParser = bodyParser.json();

app.use(jsonParser);
app.use(router);

const port = 4001;

app.listen(port, () => console.log(`App listening to port ${port}`));
