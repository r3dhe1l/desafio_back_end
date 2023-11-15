// Este bloco de código é executado quando a página é totalmente carregada
window.onload = function () {
    // Faz uma requisição assíncrona para obter a lista de disciplinas
    fetch('/disciplinas')
        .then(response => response.json()) // Converte a resposta para JSON
        .then(disciplinas => {
            const select = document.getElementById('disciplinas'); // Obtém o elemento select das disciplinas
            disciplinas.forEach(disciplina => {
                // Para cada disciplina, cria uma opção e a adiciona ao select
                const option = document.createElement('option');
                option.value = disciplina.id_disciplina;
                option.text = disciplina.nome_disciplina;
                select.appendChild(option);
            });
        })
        .catch(error => console.error(error));

    // Faz uma requisição assíncrona para obter a lista de professores
    fetch('/professores')
        .then(response => response.json()) // Converte a resposta para JSON
        .then(professores => {
            const select = document.getElementById('professores'); // Obtém o elemento select dos professores
            professores.forEach(professor => {
                // Para cada professor, cria uma opção e a adiciona ao select
                const option = document.createElement('option');
                option.value = professor.id_prof;
                option.text = professor.nome_prof + ' ' + professor.sobrenome_prof;
                select.appendChild(option);
            });
        })
        .catch(error => console.error(error));
};

// Função para criar uma turma
function criarTurma() {
    // Cria um objeto turma com os dados fornecidos pelo usuário
    const turma = {
        id_turma: Math.floor(Math.random() * 1000000),
        id_disciplina: document.getElementById('disciplinas').value,
        id_prof: document.getElementById('professores').value,
        turno: document.getElementById('turnos').value,
        dia: document.getElementById('dias').value,
        limite_vagas: document.getElementById('vagas').value
    };

    // Envia uma requisição assíncrona para criar a turma no servidor
    fetch('/criarturma', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(turma),
    })

        .then((response) => response.text()) // Converte a resposta para JSON
        .then((responseText) => {
            alert('Turma Criada' + responseText); // Exibe um alerta informando que a turma foi criada com sucesso
            window.location.reload(); // Recarrega a página para exibir as atualizações
        })
        .catch((error) => {
            console.error(error); // Exibe no console caso ocorra algum erro na requisição
        });
}
