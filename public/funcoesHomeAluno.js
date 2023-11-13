window.onload = function () {
    carregarTurmasLivres();
};

function carregarTurmasLivres() {
    const id_aluno = localStorage.getItem('currentUser');
    fetch('/turmascomvaga/' + id_aluno)
        .then(response => response.json())
        .then(turmas => {
            const turmasLivres = document.getElementById('turmasLivres').getElementsByTagName('tbody')[0];
            turmasLivres.innerHTML = '';
            turmas.forEach(turma => {
                const row = turmasLivres.insertRow();
                row.insertCell(0).textContent = turma.id_turma;
                row.insertCell(1).textContent = turma.disciplina;
                row.insertCell(2).textContent = turma.professor;
                row.insertCell(3).textContent = turma.dia + '-feira';
                row.insertCell(4).textContent = turma.turno;
                row.insertCell(5).textContent = turma.limite_vagas;
                const matriCell = row.insertCell(6);
                const matriButton = document.createElement('button');
                matriButton.textContent = 'Matricular-se';
                matriButton.addEventListener('click', function () {
                    incluirAluno(turma.id_turma, id_aluno);
                });
                matriCell.appendChild(matriButton);
            });
        })
        .catch((error) => {
            console.error(error);
        });
};

function incluirAluno(id_turma, id_aluno) {
    const alunoTurma = {
        id_turma: id_turma,
        id_aluno: id_aluno
    };

    fetch('/inseriralunoturma', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(alunoTurma)
    })
        .then((response) => response.text())
        .then((responseText) => {
            alert('Matriculado' + responseText);
        })
        .then(() => {
            carregarTurmasLivres();
        })
        .catch((error) => {
            console.error(error);
        });
};