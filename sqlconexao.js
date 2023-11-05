var mysql = require('mysql');

var connection = mysql.createPool({
   host: 'localhost',
   user: 'root',
   password: 'root',
   database: 'desafio_back_end'
});

module.exports = connection;