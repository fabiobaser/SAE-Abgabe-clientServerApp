const mysql = require("mysql");

const config = require("../config.js");

let con = mysql.createConnection(config.mysqlConfig);

con.connect(err => {
  if (err) {
    throw err;
  }
});

exports.queryMusic = (req, res, next) => {
  const regex = /([~`!#$%\^&*+_()—.—˛¬”£°„¡“¶¢≠¿“±‘–…’ﬁ˜·¯˙˚˛≥∞÷§=´\-\[\]\\';,/{}|\\":<>\?])/gm;
  const subst = `\\$1`;

  // The substituted value will be contained in the result variable
  // let query = req.query.title.replace(regex, subst);

  let sql;

  if (req.query.type === "title") {
    sql = "SELECT * FROM tracks WHERE title LIKE '%" + req.query.title + "%'";
  } else if (req.query.type === "artist") {
    sql = "SELECT * FROM tracks WHERE artist LIKE '%" + req.query.artist + "%'";
  } else {
    sql = "SELECT * FROM tracks";
  }

  con.query(sql, (err, rows, fields) => {
    if (err) {
      console.error("Error while performing query: ", err);
      res.send(null);
    } else {
      res.send(rows);
    }
  });
};

exports.addSong2 = (req, res) => {
  if (
    typeof req.query.title != "undefined" &&
    req.query.title !== "" &&
    typeof req.query.artist != "undefined" &&
    req.query.artist !== "" &&
    typeof req.query.dances != "undefined" &&
    req.query.dances !== "" &&
    typeof req.query.tags != "undefined" &&
    req.query.tags !== ""
  ) {
    let sqlGetID =
      "SELECT trackID, dances FROM tracks WHERE `title` LIKE '" + req.query.title + "' AND `artist` LIKE '" + req.query.artist + "'";

    con.query(sqlGetID, (error, results) => {
      if (results.length === 0) {
        //Not found
        let outputDances = {};
        let outputTags = {};
        JSON.parse(req.query.dances).map(dance => {
          outputDances[dance] = 1;
        });

        JSON.parse(req.query.tags).map(tag => {
          outputTags[tag] = 1;
        });

        let sqlInsert =
          "INSERT INTO `tracks` (`trackID`, `title`, `artist`, `dances`, `tags`, `coverURL`) VALUES (NULL, '" +
          req.query.title +
          "', '" +
          req.query.artist +
          "', '" +
          JSON.stringify(outputDances) +
          "', '" +
          JSON.stringify(outputTags) +
          "', '" +
          req.query.coverURL +
          "')";

        con.query(sqlInsert, (err, rows, fields) => {
          if (err) {
            res.sendStatus(500);
            console.error(err);
          } else {
            res.sendStatus(200);
          }
        });
      } else {
        //FOUND
        remoteDances = JSON.parse(results[0].dances);
        let danceObj = JSON.parse(req.query.dances);

        danceObj.map(dance => {
          if (typeof remoteDances[dance] == "undefined") {
            remoteDances[dance] = 1;
          } else {
            remoteDances[dance] = remoteDances[dance] + 1;
          }
        });

        let sqlUpdate =
          "UPDATE `tracks` SET `dances` = '" +
          JSON.stringify(remoteDances) +
          "' WHERE `title` LIKE '" +
          req.query.title +
          "' AND `artist` LIKE '" +
          req.query.artist +
          "'";

        con.query(sqlUpdate, (err, rows, fields) => {
          if (err) {
            res.sendStatus(500);
            console.error(err);
          } else {
            res.sendStatus(200);
          }
        });
      }
    });
  }
};

exports.getPlaylists = (req, res) => {
  let sql =
    "SELECT tracks.trackID, title, artist, dances, tags, coverURL FROM playlists, tracks WHERE playlists.playlistID = 1 AND playlists.trackID = tracks.trackID";

  con.query(sql, (err, rows) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.send(rows);
    }
  });
};

exports.getAll = (req, res, next) => {
  let sql = "SELECT * FROM employees";

  con.query(sql, (err, rows, fields) => {
    if (err) {
      console.log("Error while performing query!");
      res.send(null);
    } else {
      console.log(req);
      res.send(rows);
    }
  });
};

exports.insertMySQL = (req, res, next) => {
  let sql =
    "INSERT INTO `employees` (`employee-id`, `forename`, `lastname`, `title`) VALUES (NULL, '" +
    req.query.first +
    "', '" +
    req.query.last +
    "', '" +
    req.query.title +
    "')";

  con.query(sql, (err, rows, fields) => {
    if (err) {
      console.log("Error while inserting Data into Database!");
      console.log(err);
      res.send();
    } else {
      console.log(req.query);
      res.send();
    }
  });
};
