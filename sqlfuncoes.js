var db = require('./sqlconexao');

var BancoDados = {
    getProfessor: function(callback) {
        return db.query("SELECT * FROM professores", null, callback);
    },

    getDisciplina: function(callback) {
        return db.query("SELECT * FROM disciplina", null, callback);
    },


    getAlunos: function (callback) {
        return db.query("SELECT * FROM alunos",
            null, callback);
    },

    addAluno: function (aluno, callback) {
        return db.query("INSERT INTO alunos (id_aluno, nome_aluno, sobrenome_aluno) VALUES (0,?,?)",
            [aluno.id, aluno.nome, aluno.sobrenome], callback);
    }
};

module.exports = BancoDados;