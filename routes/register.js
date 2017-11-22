var express = require('express');
var router = express.Router();
var connection = require('../db.js');
// var users = require('../library/Fdb.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('register');
});

router.post('/',(req,res)=>{
  var data = req.body;
  var allData = [
    data.email,
    data.firstName,
    data.lastName,
    data.password,
    data.birthYear+"-"+data.birthMonth +"-"+data.birthDay,
    data.gender,
    data.phoneCode +""+data.phone,
    'customer'
  ];
  var a =true;
  connection.get().query('INSERT INTO users VALUES(?,?,?,?,?,?,?,?)',allData,(err,results,fields)=>{
    if(err){
      console.log("error in register form"+ err);
      a= false;
      res.redirect('/users');
    }
    else {
      console.log(Date.now()+'-'+data.u_firstname+'- has create user');
      console.log("success");
      a= true;
    }
    if(a){
      res.redirect('/');
    }
  });
});
// router.post('/',(req,res,next)=>{
//   var data = req.body;
//     var allData = [
//       data.email,
//       data.firstName,
//       data.lastName,
//       data.password,
//       data.birthYear+"-"+data.birthMonth +"-"+data.birthDay,
//       data.gender,
//       data.phoneCode +""+data.phone
//     ];
//   users.insertUser(allData,(req,res,next)=>{
//     if (err) return res.redirect('/users');
//      console.log('Data has been inserted...');
//      res.redirect('/');
//   })
// })


// regis product
router.get('/product', function(req, res, next) {
  res.render('insertProduct');
});

router.post('/product', function(req, res, next) {
  var data =req.body;
  var allData=[
    data.nameProduct,
    // data.photo,
    '/images/product/ayam.jpg',
    data.address,
    data.timeOpen,
    data.timeClose,
    data.category,
    data.phone,
    data.desc
  ];
  var a =true;
  connection.get().query('INSERT INTO product(p_name,p_photo,p_address,p_timeOpen,p_timeClose,p_category,p_phone,p_desc) VALUES(?,?,?,?,?,?,?,?)',allData,(err,results,fields)=>{
    if(err){
      console.log("error in register form"+ err);
      a= false;
      res.send(err)
    }
    else {
      console.log(Date.now()+'-'+data.nameProduct+'- has create product');
      console.log("success");
      a= true;
    }
    if(a){
      res.send('succes');
    }
  });

});

module.exports = router;
