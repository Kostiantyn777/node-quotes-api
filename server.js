const express = require("express");
const app = express();

app.use(express.json());
const quotes = require("./quotes.json");

let quotesIDFromDatabase = quotes.length - 1;

app.get("/", function (request, response) {
  response.send("/quotes/17 should return one quote, by id");
});

//Find one ore more properties from all objects in the array
app.get("/quotes", function (request, response) {
  const filter = request.query.filter;
  //console.log(filter);
  if (filter) {
    const result = quotes.map((quote) => {
      if (typeof filter === "object") {
        return filter.map((parameter) => quote[parameter]).join(", ");
      } else {
        return quote[filter];
      }
    });
    response.send(result);
    return;
  }
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
  const requestBody = request.body;
  const { quote, author } = requestBody;
  let createNewObj = { quote, author };
  quotesIDFromDatabase += 1;
  createNewObj.id = quotesIDFromDatabase;
  quotes.push(createNewObj);
  response.status(201).send();
});

app.put("/quotes/:id", function (request, response) {
  const quotesId = request.params.id;
  const requestBody = request.body;
  const { quote, author } = requestBody;
  const result = quotes.find((element) => element.id == quotesId);
  if (!result) {
    response.status(404).send(`Quote with ID ${quotesId}  was not found`);
    return;
  }

  result.quote = quote;
  result.author = author;
  response.status(200).send("OK");
});
app.delete("/quotes/:id", function (request, response) {
  const quotesId = request.params.id;
  const result = quotes.find((element) => element.id == quotesId);
  if (!result) {
    response.status(404).send(`Quote with ID ${quotesId}  was not found`);
    return;
  }

  const findElementIndex = quotes.findIndex(
    (element) => element.id == quotesId
  );
  quotes.splice(findElementIndex, 1);
  response.status(204).send();
});

app.listen(3000, () => console.log("Listening on port 3000"));
