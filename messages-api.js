const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const bodyParser = bodyParser.json();
app.use(bodyParser);

const port = 3000;
let numreq = 0;

app.listen(port, console.log(`App listening on port ${port}.`));

app.post("/messages", (req, res, next) => {
  numreq++;

  const bodyValues = Object.values(req.body);
  console.log("Request body: ", bodyValues);

  if (numreq > 5) {
    return res.status(429).end();
  }

  if (typeof bodyValues[0] !== "string" || bodyValues[0] === "") {
    return res.status(400).end();
  }

  res.status(200).send({ message: "Message received loud and clear." });
});
