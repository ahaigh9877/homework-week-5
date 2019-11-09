const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const jsonParser = bodyParser.json();
app.use(jsonParser);

const port = 3000;
let numreq = 0;

app.listen(port, console.log(`App listening on port ${port}.`));

app.post("/messages", (req, res, next) => {
  numreq++;

  const { text } = req.body;

  if (numreq > 5) {
    return res.status(429).send("Too many requests!");
  }

  if (text == "") {
    return res.status(400).send("Text property is empty.");
  } else if (!text) {
    return res.status(400).send("Text property does not exist.");
  }

  console.log("Text property: ", text);

  res
    .status(200)
    .send({ message: `Message number ${numreq} received loud and clear.` });
});
