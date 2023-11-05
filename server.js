var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var url = require('url');


app.use(express.static('public'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

var func = require('./sqlfuncoes');

app.get('/aluno', function (req, res) {
    func.getAlunos(function (err, rows) {
       if (err) {
          res.json(err);
       } else {
          console.log('Enviando resposta');
          res.json(rows);
       }
    });
 });

 var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;
 
    console.log(`Example app listening at http://%s:%s`, host, port);
 
 });