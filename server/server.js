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

//Send Status 200 for Elastic Beanstalk Health Checker
idle = (req, res, next) => {
  res.sendStatus(200);
};

//ROUTES
app.get("/", idle);
app.get("/music/", music.queryMusic);
app.get("/music/add", music.addSong2);

app.get("/music/playlists", music.getPlaylists);

app.get("/insert/", music.insertMySQL);

app.post("/user/add/", user.addUser);
app.post("/user/check/", user.checkUsername);
app.post("/user/login/", user.checkLogin);

app.get("/api/search/");

app.set("port", process.env.PORT || config["expressConfig"].PORT);

app.listen(app.get("port"), function() {
  console.log("\x1b[32m%s\x1b[0m", "Express server listening on Port " + app.get("port"));
  console.log("\n");
});
