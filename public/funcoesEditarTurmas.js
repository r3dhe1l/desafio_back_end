window.onload = function () {
    carregarTurmas();
};

function carregarTurmas() {
    fetch('/turmas')
        .then(response => response.json())
        .then(turmas => {
            const tabelaTurmas = document.getElementById('tabelaTurmas').getElementsByTagName('tbody')[0];
            tabelaTurmas.innerHTML = '';
            turmas.forEach(turma => {
                const row = tabelaTurmas.insertRow();
                row.insertCell(0).textContent = turma.id_turma;
                row.insertCell(1).textContent = turma.disciplina;
                row.insertCell(2).textContent = turma.professor;
                row.insertCell(3).textContent = turma.dia + '-feira';
                row.insertCell(4).textContent = turma.turno;
                row.insertCell(5).textContent = turma.limite_vagas;
                const linkCell = row.insertCell(6);
                const link = document.createElement('a');
                link.href = '#';
                link.textContent = 'Ver alunos';
                link.addEventListener('click', function () {
                    mostrarAlunos(turma.id_turma);
                });
                linkCell.appendChild(link);
                const deleteCell = row.insertCell(7);
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Excluir turma';
                deleteButton.addEventListener('click', function () {
                    excluirTurma(turma.id_turma);
                });
                deleteCell.appendChild(deleteButton);
            });
        })
        .catch((error) => {
            console.error(error);
        });
};

function mostrarAlunos(id_turma) {
    fetch('/alunosnaturma/' + id_turma)
        .then(response => response.json())
        .then(alunos => {
            const listaAlunos = document.getElementById('listaAlunos');
            listaAlunos.innerHTML = '';
            const title = document.createElement('h2');
            title.textContent = 'Lista de Alunos da Turma: ' + id_turma;
            listaAlunos.appendChild(title);
            alunos.forEach(aluno => {
                const item = document.createElement('div');
                item.textContent = 'Matrícula: ' + aluno.id_aluno + ', Nome: ' + aluno.nome_aluno + ' ' + aluno.sobrenome_aluno;
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Excluir';
                deleteButton.style.width = '80px';  // Altere para o valor desejado
                deleteButton.style.height = '15px';  // Altere para o valor desejado
                deleteButton.style.fontSize = '12px';  // Diminui o tamanho da fonte
                deleteButton.style.marginLeft = '10px';  // Adiciona espaço à esquerda do botão
                deleteButton.addEventListener('click', function () {
                    excluirAluno(id_turma, aluno.id_aluno);
                });
                item.appendChild(deleteButton);
                listaAlunos.appendChild(item);
            });
            const addButton = document.createElement('button');
            addButton.textContent = 'Adicionar Alunos';
            addButton.style.width = '150px';  // Altere para o valor desejado
            addButton.style.height = '30px';  // Altere para o valor desejado
            addButton.style.fontSize = '12px';  // Diminui o tamanho da fonte
            addButton.style.marginTop = '10px';  // Adiciona espaço acima do botão
            addButton.addEventListener('click', function () {
                alunosForaTurma(id_turma);
            });
            listaAlunos.appendChild(addButton);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

function excluirTurma(id_turma) {
    fetch('/alunosnaturma/' + id_turma)
        .then(response => response.json())
        .then(alunos => {
            const promises = alunos.map(aluno => excluirAluno(id_turma, aluno.id_aluno, false));
            Promise.all(promises)
                .then(() => {
                    fetch('/deletarturma/' + id_turma, {
                        method: 'DELETE',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(() => {
                            window.location.reload();
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

function excluirAluno(id_turma, id_aluno, reload = true) {
    fetch('/deletaralunodaturma/' + id_turma + '/' + id_aluno, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.text())
        .then((responseText) => {
            alert('Resposta: ' + responseText);
        })
        .then(() => {
            if (reload) {
                carregarTurmas();
                mostrarAlunos(id_turma);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
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
            alert('Resposta: ' + responseText);
        })
        .then(() => {
            carregarTurmas();
            mostrarAlunos(id_turma);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

function alunosForaTurma(id_turma) {
    fetch('/alunosforaturma/' + id_turma)
        .then(response => response.json())
        .then(alunos => {
            const alunoSelect = document.getElementById('alunoSelect');
            alunoSelect.innerHTML = '';
            alunos.forEach(aluno => {
                const option = document.createElement('option');
                option.value = aluno.id_aluno;
                option.textContent = 'Matrícula: ' + aluno.id_aluno + ', Nome: ' + aluno.nome_aluno + ' ' + aluno.sobrenome_aluno;
                alunoSelect.appendChild(option);
            });
            document.getElementById('modal').style.display = 'block';
            document.getElementById('confirmButton').dataset.turma = id_turma;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

document.getElementById('confirmButton').addEventListener('click', function () {
    const id_aluno = document.getElementById('alunoSelect').value;
    const id_turma = this.dataset.turma;
    incluirAluno(id_turma, id_aluno);
    document.getElementById('modal').style.display = 'none';
});

document.getElementById('cancelButton').addEventListener('click', function () {
    document.getElementById('modal').style.display = 'none';
});