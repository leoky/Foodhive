var express = require('express');
var router = express.Router();
var session = require('express-session');

var checkSignin = function(req,res,next){
  if(req.session.username){
    console.log('berhasi');
    next();

  }else{
    res.redirect('/users');
  }
}

module.exports = checkSignin;
