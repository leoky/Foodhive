var express = require('express');
var router = express.Router();
// var check = require('../model/Fdb.js');
var check = require('./check.js');

/* GET home page. */
router.get('/',function(req, res, next) {
  var login;
  if (req.session.username) {
    login = true;
  } else {
    login = false;
  }
  res.render('index',{login:login,urlTemp:'/'});
});


module.exports = router;
