let dataA;
let dataF;
fetch('../loginAlunos.json')
    .then((response) => response.json())
    .then((body) => {
        dataA = body.aluno;
    });

fetch('../loginFuncionarios.json')
    .then((response) => response.json())
    .then((body) => {
        dataF = body.funcionario;
    });