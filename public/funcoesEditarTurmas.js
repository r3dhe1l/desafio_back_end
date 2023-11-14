// Função que é executada quando a janela é carregada
window.onload = function () {
    carregarTurmas();
};

// Função para carregar as turmas
function carregarTurmas() {
    // Realiza uma requisição para obter as turmas
    fetch('/turmas')
        .then(response => response.json())
        .then(turmas => {
            // Obtém a tabela de turmas e limpa seu conteúdo
            const tabelaTurmas = document.getElementById('tabelaTurmas').getElementsByTagName('tbody')[0];
            tabelaTurmas.innerHTML = '';

            // Itera sobre as turmas e adiciona na tabela
            turmas.forEach(turma => {
                const row = tabelaTurmas.insertRow();
                row.insertCell(0).textContent = turma.id_turma;
                row.insertCell(1).textContent = turma.disciplina;
                row.insertCell(2).textContent = turma.professor;
                row.insertCell(3).textContent = turma.dia + '-feira';
                row.insertCell(4).textContent = turma.turno;
                row.insertCell(5).textContent = turma.limite_vagas;

                // Cria um link para visualizar os alunos e um botão para excluir a turma
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
}

// Função para mostrar os alunos de uma turma
function mostrarAlunos(id_turma) {
    fetch(`/alunosnaturma/` + id_turma)
        .then(response => response.json())
        .then(alunos => {
            const listaAlunos = document.getElementById('listaAlunos');
            listaAlunos.innerHTML = '';

            // Adiciona um título à lista de alunos
            const title = document.createElement('h2');
            title.textContent = `Lista de Alunos da Turma:` + id_turma;
            listaAlunos.appendChild(title);

            // Itera sobre os alunos e adiciona na lista
            alunos.forEach(aluno => {
                const item = document.createElement('div');
                item.textContent = `Aluno ID: ${aluno.id_aluno}, Nome: ${aluno.nome_aluno} ${aluno.sobrenome_aluno}`;

                // Cria um botão de exclusão para cada aluno
                const deleteButtonColumn = document.createElement('div');
                deleteButtonColumn.style.float = 'right';
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Excluir';
                deleteButton.style.width = '50px';
                deleteButton.style.height = '15px';
                deleteButton.style.fontSize = '12px';
                deleteButton.style.marginLeft = '20px'
                deleteButton.addEventListener('click', function () {
                    excluirAluno(id_turma, aluno.id_aluno);
                });
                deleteButtonColumn.appendChild(deleteButton);
                item.appendChild(deleteButton);
                listaAlunos.appendChild(item);
            });

            // Adiciona um botão para adicionar alunos
            const addButton = document.createElement('button');
            addButton.textContent = 'Adicionar Alunos';
            addButton.style.width = '150px';
            addButton.style.height = '30px';
            addButton.style.fontSize = '12px';
            addButton.style.marginTop = '10px';
            addButton.addEventListener('click', function () {
                alunosForaTurma(id_turma);
            });
            listaAlunos.appendChild(addButton);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Função para excluir uma turma
function excluirTurma(id_turma) {
    fetch(`/alunosnaturma/` + id_turma)
        .then(response => response.json())
        .then(alunos => {
            // Cria um array de promises para excluir cada aluno
            const promises = alunos.map(aluno => excluirAluno(id_turma, aluno.id_aluno, false));

            // Executa as promises em paralelo
            Promise.all(promises)
                .then(() => {
                    // Após excluir os alunos, deleta a turma e recarrega a página
                    fetch(`/deletarturma/` + id_turma, {
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
}

// Função para excluir um aluno de uma turma
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
            // Após excluir o aluno, recarrega a lista de turmas e de alunos da turma
            if (reload) {
                carregarTurmas();
                mostrarAlunos(id_turma);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Função para incluir um aluno em uma turma
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
            // Após incluir o aluno, recarrega a lista de turmas e de alunos da turma
            carregarTurmas();
            mostrarAlunos(id_turma);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Função para obter alunos que não estão em uma turma
function alunosForaTurma(id_turma) {
    fetch(`/alunosforaturma/` + id_turma)
        .then(response => response.json())
        .then(alunos => {
            // Preenche um select com os alunos que não estão na turma
            const alunoSelect = document.getElementById('alunoSelect');
            alunoSelect.innerHTML = '';
            alunos.forEach(aluno => {
                const option = document.createElement('option');
                option.value = aluno.id_aluno;
                option.textContent = `Aluno ID: ${aluno.id_aluno}, Nome: ${aluno.nome_aluno} ${aluno.sobrenome_aluno}`;
                alunoSelect.appendChild(option);
            });

            // Exibe o modal para confirmar a adição do aluno
            document.getElementById('modal').style.display = 'block';
            document.getElementById('confirmButton').dataset.turma = id_turma;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Adiciona um listener para o botão de confirmação no modal
document.getElementById('confirmButton').addEventListener('click', function () {
    const id_aluno = document.getElementById('alunoSelect').value;
    const id_turma = this.dataset.turma;
    incluirAluno(id_turma, id_aluno);
    document.getElementById('modal').style.display = 'none';
});

// Adiciona um listener para o botão de cancelamento no modal
document.getElementById('cancelButton').addEventListener('click', function () {
    document.getElementById('modal').style.display = 'none';
});
