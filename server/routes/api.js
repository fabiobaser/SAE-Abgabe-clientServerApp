const itunesSearch = require("itunes-search");

var options = {
  media: "movie",
  entity: "movie",
  limit: 25
};

itunes.search("field of dreams", options, function(response) {
  // do stuff with 'response'
  console.log(response);
});
