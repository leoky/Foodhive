var mysql = require('mysql');

var PRODUCTION_DB = 'foodhive'
  , TEST_DB = 'foodhive_test'

exports.MODE_TEST = 'mode_test'
exports.MODE_PRODUCTION = 'mode_production'

var state = {
  pool: null,
  mode: null,
}

exports.connect = function(mode, done) {
  state.pool = mysql.createPool({
    // host: 'dhifamedia.com',
    // user: 'foodhive',
    // password: 'FHcdlw',
    host: 'localhost',
    user: 'root',
    password: 'abc',
    database: mode === exports.MODE_PRODUCTION ? PRODUCTION_DB : TEST_DB
  })

  state.mode = mode
  done()
}

exports.get = function() {
  return state.pool
}
