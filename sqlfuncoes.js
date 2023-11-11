var db = require('./sqlconexao');

var BancoDados = {
    getProfessor: function (callback) {
        return db.query("SELECT professores.id_prof, professores.nome_prof, professores.sobrenome_prof FROM professores LEFT JOIN turmas ON professores.id_prof = turmas.id_prof WHERE turmas.id_prof IS NULL", null, callback);
    },

    getDisciplina: function (callback) {
        return db.query("SELECT disciplinas.id_disciplina, disciplinas.nome_disciplina FROM disciplinas LEFT JOIN turmas ON disciplinas.id_disciplina = turmas.id_disciplina WHERE turmas.id_disciplina IS NULL", null, callback);
    },

    getTurmas: function (callback) {
        return db.query("SELECT * FROM turmas", null, callback);
    },

    getTurmasComVaga: function (callback) {
        return db.query("SELECT * FROM turmas WHERE limite_vagas > 0", null, callback);
    },

    getAlunosDaTurmas: function (idTurma, callback) {
        return db.query("SELECT alunos.id_aluno, alunos.nome_aluno, alunos.sobrenome_aluno FROM alunos INNER JOIN turma_alunos ON alunos.id_aluno = turma_alunos.id_aluno WHERE turma_alunos.id_turma = ?", [idTurma], callback);
    },

    getAlunosForaTurma: function (idTurma, callback) {
        return db.query("SELECT alunos.id_aluno, alunos.nome_aluno, alunos.sobrenome_aluno FROM alunos LEFT JOIN turma_alunos ON alunos.id_aluno = turma_alunos.id_aluno WHERE turma_alunos.id_turma != ? OR turma_alunos.id_turma IS NULL", [idTurma], callback);
    },

    getNomeAluno: function (idAluno, callback) {
        return db.query("SELECT nome_aluno FROM alunos WHERE id_aluno = ?", [idAluno], callback);
    },

    insertAlunoTurma: function (alunoTurma, callback) {
        return db.query("INSERT INTO turma_alunos (id_turma, id_aluno) VALUES (?,?)", [alunoTurma.id_turma, alunoTurma.id_aluno], callback);
    },

    insertTurma: function (turma, callback) {
        return db.query("INSERT INTO turmas (id_turma, id_disciplina, id_prof, turno, dia, limite_vagas) VALUES (?,?,?,?,?,?)", [turma.id_turma, turma.id_disciplina, turma.id_prof, turma.turno, turma.dia, turma.limite_vagas], callback);
    },

    deleteAlunoTurma: function (alunoTurma, callback) {
        return db.query("DELETE FROM turma_alunos WHERE id_turma = ? AND id_aluno = ?", [alunoTurma.id_turma, alunoTurma.id_aluno], callback);
    },

    deleteTurma: function (idTurma, callback) {
        return db.query("DELETE FROM turmas WHERE id_turma = ?", [idTurma], callback);
    },

    decrementaLimite: function (idTurma, callback) {
        return db.query("UPDATE turmas SET limite_vagas = limite_vagas - 1 WHERE id_turma = ?", [idTurma], callback);
    },

    incrementaLimite: function (idTurma, callback) {
        return db.query("UPDATE turmas SET limite_vagas = limite_vagas + 1 WHERE id_turma = ?", [idTurma], callback);
    }
};

module.exports = BancoDados;