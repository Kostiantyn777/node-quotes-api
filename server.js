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

  const filteredByID = quotes.find((element) => element.id == requestedId);
  if (!filteredByID) {
    return response
      .status(404)
      .send(`Quote with ID ${requestedId}  was not found`);
  }
  response.send(filteredByID);
});

app.post("/quotes", function (request, response) {
  console.log("POST /quotes route");
  console.log(request.body);
  quotes.push(request.body);
});

app.put("/quotes/:id", function (request, response) {
  const quotesId = request.params.id;
  const requestBody = request.body;
  const { quote, author } = requestBody;
  const result = quotes.find((element) => element.id == quotesId);
  result.quote = quote;
  result.author = author;
  response.status(200).send("OK");
});

app.listen(3000, () => console.log("Listening on port 3000"));
