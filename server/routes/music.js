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
  const subst = `\$1`;

  // The substituted value will be contained in the result variable
  let query = req.query.title.replace(regex, subst);

  let sql = "SELECT * FROM tracks WHERE title LIKE '%" + req.query.title + "%'";

  con.query(sql, (err, rows, fields) => {
    if (err) {
      console.error("Error while performing query: ", err);
      res.send(null);
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
