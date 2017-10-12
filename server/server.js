//REQUIRES
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

//CONFIG
const config = require("./config.js");

//ROUTES
const music = require("./routes/music.js");
const user = require("./routes/user.js");

let app = express();

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

app.use(methodOverride());

app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

//ROUTES
app.get("/music/", music.queryMusic);

app.get("/insert/", music.insertMySQL);

app.post("/user/add/", user.addUser);
app.post("/user/check/", user.checkUsername);
app.post("/user/login/", user.checkLogin);

//app.get('/employees/:id', employees.findByID);

//app.get('/events/', events.getAll);

//app.get('/photos/', photos.getAlbums);
//app.get('/photos/:albumId', photos.findByID);

//Wildcard-Case for general Result
//app.get('*', employees.findAll);

app.set("port", process.env.PORT || config["expressConfig"].PORT);

app.listen(app.get("port"), function() {
  console.log("Express server listening on Port " + app.get("port"));
});
