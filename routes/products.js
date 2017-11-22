var express = require('express');
var router = express.Router();
var connection = require('../db.js');
var session = require('express-session');
var dateTime = require('node-datetime');
var url = require('url');
/* GET home page. */
var userData = '';
var old = false;
var urlTemp = '';
var login = false;

var reviewUser = function (req, res, next) {
  if (req.session.username) {
    connection.get().query('SELECT * FROM review where u_id = ? and p_id = ?', [req.session.username, req.params.id], (err, results) => {
      if (err) {
        console.log('err in userreview product' + err);
      } else {
        if (results.length === 0) {
          userData = [];
          old = false;
          console.log("usersereres :" + userData);
        }
        else {
          userData = results;
          console.log("usersereres :" + userData[0].r_review);
          old = true;
        }
      }
    });
    next();
  } else {
    next();
  }
};
router.get('/:id/del', (req, res) => {
  var id = req.params.id;
  connection.get().query('DELETE FROM review where p_id = ? AND u_id = ?', [id, req.session.username], (err, results) => {
    if (err) {
      console.log('err in del products ' + err);
      res.send(err);
    } else {
      res.redirect('/products/' + id);
      console.log("sucess del review ");
    }
  });
});
router.get('/:id', reviewUser, function (req, res, next) {
  var id = req.params.id;
  // var urlTemp = req.query.u;
  connection.get().query('select * from review inner join users on users.u_id = review.u_id inner join product on product.p_id = review.p_id where review.p_id = ? and s_id = "1" order by review.r_date desc;', [id], (err, results, fields) => {
    if (err) {
      console.log('err in products ' + err);
      res.send(err);
    } else {
      var allComment = false;
      if (req.session.username) {
        login = true;
      } else {
        login = false;
      }
      // check if empty
      if (results.length === 0) {
        allComment = false;
        connection.get().query("SELECT * FROM product where p_id= ?", [id], (err, results, fields) => {
          if (err) {
            res.send(err);
            console.log(err);
          } else {
            res.render('products/product', { results: results, allComment: allComment, userData: userData, urlTemp:'/products/'+id,login:login });
            userData = [];
          }
        });
      }
      else {
        allComment = true;
        res.render('products/product', { results: results, allComment: allComment, userData: userData, urlTemp:'/products/'+id,login:login });
        userData = [];
      }
    }
  });
});
// insert review
router.post('/:id', (req, res) => {

  var datenow = dateTime.create();
  var date = datenow.format('Y-m-d H:M:S');

  var data = req.body;
  var product = req.params.id;

  if (old) {
    connection.get().query('UPDATE review SET  r_star = ? , r_review = ?, r_date=?, s_id ="3" WHERE u_id = ? AND p_id = ? ', [data.rate, data.Freview, date, req.session.username, product], (err, results) => {
      if (err) {
        console.log("error in update review form" + err);
        res.send(err);
      }
      else {
        console.log(Date.now() + req.session.username + '- has update review');
        console.log("success");
        res.redirect('/products/' + product);
      }
    });
  } else {
    var allData = [
      req.session.username,
      product,
      data.rate,
      req.body.Freview,
      date,
      1
    ];
    connection.get().query('INSERT INTO review values(default,?,?,?,?,?,?)', allData, (err, results) => {
      if (err) {
        console.log("error in review form" + err);
        res.send(err);
      }
      else {
        console.log(Date.now() + req.session.username + '- has create review');
        console.log("success");
        res.redirect('/products/' + product);
      }
    });
  }
});


module.exports = router;
