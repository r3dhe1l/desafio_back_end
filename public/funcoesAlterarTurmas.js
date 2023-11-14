window.onload = function () {
    carregarTurmasMatriculadas();
};

function carregarTurmasMatriculadas() {
    const id_aluno = localStorage.getItem('currentUser');
    fetch('/turmasdoaluno/' + id_aluno)
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
                const desmatriCell = row.insertCell(5);
                const desmatriButton = document.createElement('button');
                desmatriButton.textContent = 'Desmatricular-se';
                desmatriButton.addEventListener('click', function () {
                    excluirAluno(turma.id_turma, id_aluno);
                });
                desmatriCell.appendChild(desmatriButton);
            });
        })
        .catch((error) => {
            console.error(error);
        });
};

function excluirAluno(id_turma, id_aluno) {
    fetch('/deletaralunodaturma/' + id_turma + '/' + id_aluno, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.text())
        .then((responseText) => {
            alert('Desmatriculado' + responseText);
        })
        .then(() => {
            carregarTurmasMatriculadas();
        })
        .catch((error) => {
            console.error(error);
        });
};