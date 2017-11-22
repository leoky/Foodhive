var express = require('express');
var router = express.Router();
var session = require('express-session');
var connection = require('../db.js');
var url = require('url');

var login = false;
var urlTemp = '/';

/* GET users listing. */
router.get('/', function (req, res, next) {
  urlTemp = req.query.u;
  console.log("user " + urlTemp);
  res.render('login');
});


router.get('/logout', (req, res) => {
  urlTemp = req.query.u;
  req.session.destroy(() => {
    console.log('session has destroy');
  });
  res.redirect(urlTemp);
});

router.post('/', function (req, res) {
  var name = req.body.username;
  var pass = req.body.password;
  connection.get().query('SELECT * FROM USERS WHERE u_id = ?', [name], (error, results, fields) => {
    if (error) {
      console.log("error ocurred login", error);
    } else {
      if (pass !== results[0].u_password) {
        res.send("Unknown user or password");
      } else {
        req.session.username = name;
        if (urlTemp == undefined) {
          urlTemp = '/';
        }
        if (results[0].u_status == 'admin') {
          res.redirect('/admin');
        } else {
          res.redirect(urlTemp);
        }


      }
    }
  });
});
module.exports = router;
