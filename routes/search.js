var express = require('express');
var router = express.Router();
var connection = require('../db.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  var search = "%" + req.query.Fsearch + "%";
  console.log(search);
  connection.get().query('select p.p_id, p.p_name,p.p_photo,p.p_address,p.p_timeOpen,p.p_timeClose,p.p_category,round(avg(r.r_star)) as avg,count(r.u_id) as count from product p left outer join review r on p.p_id = r.p_id where p.p_name like ? group by p.p_id order by avg desc;', [search], (err, results, fields) => {
    // connection.get().query('SELECT * FROM product where p_name like ?',[search],(err,results,fields)=>{
    if (err) {
      console.log('err in products ' + err);
      res.send(err);
    } else {
      var login;
      if (req.session.username) {
        login = true;
      } else {
        login = false;
      }
      res.render('search', { results: results, urlTemp: '/search', login: login });
    }
  });
});

module.exports = router;
