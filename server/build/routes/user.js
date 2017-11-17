const mysql = require('mysql');

const clc = require('cli-color');

const config = require('../config.js');

let con = mysql.createConnection(config.mysqlConfig)

//Establish connection
con.connect(err => {
  if (err) {
    throw err
  }
})

//Add User with Params
exports.addUser = (req, res) => {

  //Early Return if Params are not given
  if (req.query.name == null ||  req.query.lastname == null || req.query.username == null || req.query.password == null) {
    res.send()
    return
  }

  let pass = "";

  let sql = "INSERT INTO `user` (`user-id`, `name`, `lastname`, `username`, `password`) VALUES (NULL, '" +
    req.query.name +
    "', '" +
    req.query.lastname +
    "', '" +
    req.query.username +
    "', '" +
    req.query.password +
    "')";

  con.query(sql, (err, rows, fields) => {

    if (err) {
      throw err
    } else {
      console.log(clc.blue("Successfully inserted into Database"));
    }

  })

  res.sendStatus(200)

}

//Check if Username is already taken; If not return false
exports.checkUsername = (req, res) => {
  if (req.query.username == null) {
    res.send()
    return
  }

  let sql = "SELECT username FROM user WHERE username LIKE '" + req.query.username + "'"


  con.query(sql, (err, rows) => {
    if (err) {
      throw err
    } else {
      if (rows.length == 0) {
        //Username not found ... return false
        res.send(false)

      } else {
        //Username found ... return true
        res.send(true)
      }
    }
  })
}

//Check if Username exists and if Password meets DB-Content; returns Object with error/data
exports.checkLogin = (req, res) => {

  //Early Return if Params are not given
  if (req.query.username == null ||  req.query.password == null) {
    res.sendStatus(500)
    return
  }

  let sql = "SELECT * FROM user WHERE username LIKE '" + req.query.username + "'";

  con.query(sql, (err, rows) => {

    if (rows.length == 0) {
      res.send({
        err: 'Username does not exist',
        data: null
      });
      return;
    } else if (rows[0].password == req.query.password) {
      res.send({
        err: false,
        data: {
          name: rows[0].name,
          lastname: rows[0].lastname,
          username: rows[0].username
        }
      })
    } else if (rows[0].password !== req.query.password) {
      res.send({
        err: "Wrong Password",
        data: null
      })
    } else {
      res.send({
        err: 'Internal Server Error',
        data: null
      })
    }

  })

}