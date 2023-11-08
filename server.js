var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var url = require('url');


app.use(express.static('public'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

var func = require('./sqlfuncoes');

app.get('/professores', function (req, res) {
   func.getProfessor(function (err, rows) {
      if (err) {
         res.json(err);
      } else {
         res.json(rows);
      }
   });
});

app.get('/disciplinas', function (req, res) {
   func.getDisciplina(function (err, rows) {
      if (err) {
         res.json(err);
      } else {
         res.json(rows);
      }
   });
});

app.get('/turmas', function (req, res) {
   func.getTurmas(function (err, rows) {
      if (err) {
         res.json(err);
      } else {
         res.json(rows);
      }
   });
});

app.get('/turmascomvaga', function (req, res) {
   func.getTurmasComVaga(function (err, rows) {
      if (err) {
         res.json(err);
      } else {
         res.json(rows);
      }
   });
});

app.get('/alunosnaturma', function (req, res) {
   func.getAlunosDaTurmas(function (err, rows) {
      if (err) {
         res.json(err);
      } else {
         res.json(rows);
      }
   });
});

app.get('/alunosforaturma', function (req, res) {
   func.getAlunosForaTurma(function (err, rows) {
      if (err) {
         res.json(err);
      } else {
         res.json(rows);
      }
   });
});

app.post('/inseriralunoturma', function (req, res) {
   func.insertAlunoTurma(req.body, function (err, rs) {
      if (err) {
         res.json(err);
      } else {
         func.decrementaLimiteVagas(req.body.id_turma, function (err, rs) {
            if (err) {
               res.json(err);
            } else {
               res.writeHead(200, { 'Content-Type': 'application/json' });
               res.end('{ "msg": "Inserido com sucesso" }');
            }
         });
      }
   });
});

app.post('/criarturma', function (req, res) {
   func.insertTurma(req.body, function (err, rs) {
      if (err) {
         res.json(err);
      } else {
         res.writeHead(200, { 'Content-Type': 'application/json' });
         res.end('{ "msg": "Turma criada" }');
      }
   });
});

app.delete('/deletarturma', function (req, res) {
   func.deleteTurma(req.body, function (err, rs) {
      if (err) {
         res.json(err);
      } else {
         res.writeHead(200, { 'Content-Type': 'application/json' });
         res.end('{ "msg": "Turma deletada" }');
      }
   });
});

app.delete('/deletaralunodaturma', function (req, res) {
   func.deleteAlunoTurma(req.body, function (err, rs) {
      if (err) {
         res.json(err);
      } else {
         func.incrementaLimite(req.body.id_turma, function (err, rs) {
            if (err) {
               res.json(err);
            } else {
               res.writeHead(200, { 'Content-Type': 'application/json' });
               res.end('{ "msg": "Aluno deletado da turma" }');
            }
         });
      }
   });
});

var server = app.listen(3000, function () {

   var host = server.address().address;
   var port = server.address().port;

   console.log(`Example app listening at http://%s:%s`, host, port);

});