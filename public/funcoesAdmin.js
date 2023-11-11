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
        .catch(error => console.error('Error:', error));

    fetch('/professores')
        .then(response => response.json())
        .then(professores => {
            const select = document.getElementById('professores');
            professores.forEach(professor => {
                const option = document.createElement('option');
                option.value = professor.id_prof;
                option.text = professor.nome_prof + " " + professor.sobrenome_prof;
                select.appendChild(option);
            });
        })
        .catch(error => console.error('Error:', error));
};

function criarTurma() {
    const  turma = {
        id_turma: Math.floor(Math.random() * 1000000),
        id_disciplina: document.getElementById('disciplinas').value,
        id_prof: document.getElementById('professores').value,
        turno: document.getElementById('turnos').value,
        dia: document.getElementById('dias').value,
        limite_vagas: document.getElementById('vagas').value
    };

    console.log(turma);

    fetch('/criarturma', {
        method: 'POST',
        headers: {
            
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(turma),
    })
        .then(response => response.json())
        .then(data => {
            alert('Turma Criada');
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}