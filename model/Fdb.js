var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'abc',
  database : 'foodhive'
});

var conn= connection.connect(function(err){
  if(!err) {
    console.log("Database is connected ... ");
  } else {
    console.log("Error connecting database ...",err);
  }
});

module.exports = connection;

// var db= require('../db.js');
//
// exports.insertUser = (...profile, done){
//   db.get().query('INSERT INTO USERS VALUES(?,?,?,?,?,?,?)',profile,(err,results)=>{
//     if(err) return done(err);
//     done(null,results);
//   })
// }
