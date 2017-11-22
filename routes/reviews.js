var express = require('express');
var router = express.Router();
var connection = require('../db.js');
var session = require('express-session');
var pid = require('./products.js');
/* GET home page. */

router.get('/',(req,res)=>{
  res.send('hahahahha');
});

router.post('/',(req,res)=>{
  var data = req.body;
  console.log('product'+  pid.productId);
  var allData = [
    1,
    req.session.username,
    pid.productId,
    '5',
    req.body.Freview,
    '2012-20-12',
    3
  ];
  connection.get().query('INSERT INTO review values(?,?,?,?,?,?,?)',allData,(err,results)=>{
    if(err){
      console.log("error in review form"+ err);
      res.send(err);
    }
    else {
      console.log(Date.now()+req.session.username+'- has create review');
      console.log("success");
      res.redirect('/');
    }
  });
});

module.exports = router;
