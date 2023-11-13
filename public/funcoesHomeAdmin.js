window.onload = function () {
    fetch('/disciplinas')
        .then(response => response.json())
        .then(disciplinas => {
            const select = document.getElementById('disciplinas');
            disciplinas.forEach(disciplina => {
                const option = document.createElement('option');
                option.value = disciplina.id_disciplina;
                option.text = disciplina.nome_disciplina;
                select.appendChild(option);
            });
        })
        .catch(error => console.error(error));

    fetch('/professores')
        .then(response => response.json())
        .then(professores => {
            const select = document.getElementById('professores');
            professores.forEach(professor => {
                const option = document.createElement('option');
                option.value = professor.id_prof;
                option.text = professor.nome_prof + ' ' + professor.sobrenome_prof;
                select.appendChild(option);
            });
        })
        .catch(error => console.error(error));
};

function criarTurma() {
    const turma = {
        id_turma: Math.floor(Math.random() * 1000000),
        id_disciplina: document.getElementById('disciplinas').value,
        id_prof: document.getElementById('professores').value,
        turno: document.getElementById('turnos').value,
        dia: document.getElementById('dias').value,
        limite_vagas: document.getElementById('vagas').value
    };

    fetch('/criarturma', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(turma),
    })
        .then((response) => response.text())
        .then((responseText) => {
            alert('Turma Criada' + responseText);
            window.location.reload();
        })
        .catch((error) => {
            console.error(error);
        });
}