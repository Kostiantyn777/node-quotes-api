const express = require("express");
const app = express();

app.use(express.json());
const quotes = require("./quotes.json");

app.get("/", function (request, response) {
  response.send("/quotes/17 should return one quote, by id");
});

app.get("/quotes", function (request, response) {
  response.send(quotes);
});

app.get("/quotes/:id", function (request, response) {
  const requestedId = request.params.id;

  const filteredByID = quotes.filter((element) => element.id == requestedId);

  response.send(filteredByID);
});

app.post("/quotes", function (request, response) {
  console.log("POST /quotes route");
  console.log(request.body);
  quotes.push(request.body);
});

app.listen(3000, () => console.log("Listening on port 3000"));
