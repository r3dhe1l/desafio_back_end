var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var url = require('url');


app.use(express.static('public'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

var db = require('./sqlfuncoes');

app.get('/professores', function (req, res) {
   db.getProfessor(function (err, rows) {
      if (err) {
         res.json(err);
      } else {
         res.json(rows);
      }
   });
});

app.get('/disciplinas', function (req, res) {
   db.getDisciplina(function (err, rows) {
      if (err) {
         res.json(err);
      } else {
         res.json(rows);
      }
   });
});

app.get('/turmas', function (req, res) {
   db.getTurmas(function (err, rows) {
      if (err) {
         res.json(err);
      } else {
         res.json(rows);
      }
   });
});

app.get('/turmascomvaga/:aid', function (req, res) {
   db.getTurmasComVaga(req.params.aid, function (err, rows) {
      if (err) {
         res.json(err);
      } else {
         res.json(rows);
      }
   });
});

app.get('/alunosnaturma/:tid', function (req, res) {
   db.getAlunosDaTurmas(req.params.tid, function (err, rows) {
      if (err) {
         res.json(err);
      } else {
         res.json(rows);
      }
   });
});

app.get('/alunosforaturma/:tid', function (req, res) {
   db.getAlunosForaTurma(req.params.tid, function (err, rows) {
      if (err) {
         res.json(err);
      } else {
         res.json(rows);
      }
   });
});

app.get('/turmasdoaluno/:aid', function (req, res) {
   db.getTurmasDoAluno(req.params.aid, function (err, rows) {
      if (err) {
         res.json(err);
      } else {
         res.json(rows);
      }
   });
});

app.get('/nomealuno/:aid', function (req, res) {
   db.getNomeAluno(req.params.aid, function (err, rows) {
      if (err) {
         res.json(err);
      } else {
         res.json(rows);
      }
   });
});

app.post('/inseriralunoturma', function (req, res) {
   db.insertAlunoTurma(req.body, function (err, rs) {
      if (err) {
         res.json(err);
      } else {
         db.decrementaLimite(req.body.id_turma, function (err, rs) {
            if (err) {
               res.json(err);
            } else {
               res.writeHead(200, { 'Content-Type': 'application/json' });
               res.end('');
            }
         });
      }
   });
});

app.post('/criarturma', function (req, res) {
   db.insertTurma(req.body, function (err, rs) {
      if (err) {
         res.json(err);
      } else {
         res.writeHead(200, { 'Content-Type': 'application/json' });
         res.end('');
      }
   });
});

app.delete('/deletarturma/:tid', function (req, res) {
   db.deleteTurma(req.params.tid, function (err, rs) {
      if (err) {
         res.json(err);
      } else {
         res.writeHead(200, { 'Content-Type': 'application/json' });
         res.end('');
      }
   });
});

app.delete('/deletaralunodaturma/:tid/:aid', function (req, res) {
   db.deleteAlunoTurma(req.params.tid, req.params.aid, function (err, rs) {
      if (err) {
         res.json(err);
      } else {
         db.incrementaLimite(req.params.tid, function (err, rs) {
            if (err) {
               res.json(err);
            } else {
               res.writeHead(200, { 'Content-Type': 'application/json' });
               res.end('');
            }
         });
      }
   });
});

var server = app.listen(3000, function () {

   var host = server.address().address;
   var port = server.address().port;

   console.log('Example app listening at http://%s:%s', host, port);

});