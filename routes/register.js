var express = require('express');
var router = express.Router();
var connection = require('../db.js');
var fs = require('fs');
var multer = require('multer');

var productLocation = "./public/images/product/";
var Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    connection.get().query('select * from product order by p_id desc limit 1', (err, results) => {
      if (err) {
        console.log('errr in input product db' + err);
      } else {
        fs.mkdirSync("./public/images/product/" + (results[0].p_id + 1), (err) => {
          console.log("err in regist using fs " + err);
        });
        productLocation = "/images/product/" + (results[0].p_id + 1) + "/" + Date.now() + "_" + file.originalname;
        console.log("PRODUCT : " + productLocation);
        callback(null, "./public/images/product/" + (results[0].p_id + 1));
      }
    });
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "_" + file.originalname);
  }
});

var upload = multer({
  storage: Storage
  // fileFilter: function(req, file, callback) {
  //   var ext = path.extname(file.originalname)
  //   if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
  //     return callback(res.end('Only images are allowed'), null)
  //   }
  //   callback(null, true)
  // }
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('register');
});

router.post('/', (req, res) => {
  var data = req.body;
  var allData = [
    data.email,
    data.firstName,
    data.lastName,
    data.password,
    data.birthYear + "-" + data.birthMonth + "-" + data.birthDay,
    data.gender,
    data.phoneCode + "" + data.phone,
    'customer'
  ];
  var a = true;
  connection.get().query('INSERT INTO users VALUES(?,?,?,?,?,?,?,?)', allData, (err, results, fields) => {
    if (err) {
      console.log("error in register form" + err);
      a = false;
      res.redirect('/users');
    }
    else {
      console.log(Date.now() + '-' + data.u_firstname + '- has create user');
      console.log("success");
      a = true;
    }
    if (a) {
      res.redirect('/');
    }
  });
});


// regis product
router.get('/product', function (req, res, next) {
  res.render('insertProduct');
});

router.post('/product', upload.single('photo'), function (req, res) {
  var data = req.body;
  console.log(data);
  var allData = [
    data.nameProduct,
    productLocation,
    data.address,
    data.timeOpen,
    data.timeClose,
    data.category,
    data.phone,
    data.desc
  ];
  var a = true;
  connection.get().query('INSERT INTO product(p_name,p_photo,p_address,p_timeOpen,p_timeClose,p_category,p_phone,p_desc) VALUES(?,?,?,?,?,?,?,?)', allData, (err, results, fields) => {
    if (err) {
      console.log("error in register form" + err);
      a = false;
      res.send(err)
    }
    else {
      console.log(Date.now() + '-' + data.nameProduct + '- has create product');
      console.log("success");
      a = true;
    }
    if (a) {
      res.send('succes');
    }
  });

});

module.exports = router;
