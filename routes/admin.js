var express = require('express');
var router = express.Router();
var connection = require('../db.js');
var check = require('./check.js');

/* GET home page. */
router.get('/', check, function (req, res, next) {
    if (req.session.username) {
        login = true;
    } else {
        login = false;
    }
    connection.get().query('SELECT * FROM review natural join product', (err, results) => {
        if (err) {
            console.log("err in admin");
        } else {
            res.render('admin', { finalResult: results, urlTemp: '/' });
        }
    })
});

router.post('/update/:status/:id', (req, res) => {
    status = req.params.status;
    id = req.params.id;

    connection.get().query('UPDATE review SET s_id = ? WHERE r_id = ?', [status, id], (err, results) => {
        if (err) {
            console.log('err in admin update' + err);
        } else {
            res.redirect('/admin');
        }
    });
});

module.exports = router;
