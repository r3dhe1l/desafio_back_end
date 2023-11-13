function enter(userType, nome) {
    alert('Seja bem-vindo ' + nome + '!');
    if (userType == 'Aluno') {
        window.location.href = 'homeAluno.html';
    } else if (userType == 'Funcionario') {
        window.location.href = 'homeAdmin.html';
    }
}

async function logon(event) {
    event.preventDefault();
    const id = document.getElementById('id').value;
    const password = document.getElementById('password').value;
    const userType = document.getElementById('selecao').value;
    const selecao = userType == 'Aluno' ? dataA.login : dataF.login;
    await localStorage.setItem('currentUser', id);

    for (let i = 0; i < selecao.length; i++) {
        if (id == selecao[i].id && password == selecao[i].password) {
            const nome = userType == 'Funcionario' ? selecao[i].nome : await nomeAluno(id);
            enter(userType, nome);
            return;
        } else if (i == selecao.length - 1) {
            alert('Seu login e/ou senha não estão corretos.\nTente novamente.');
        }
    }
}

function nomeAluno(id) {
    return fetch('/nomealuno/' + id)
        .then(response => {
            return response.json();
        })
        .then(response => {
            return response[0].nome_aluno;
        })
        .catch((error) => {
            console.error(error)
        });
}

function logout() {
    if (localStorage.getItem('currentUser') !== '') {
        alert('Você saiu, ' + localStorage.getItem('currentUser'));
        window.location.href = 'index.html';
        localStorage.removeItem('currentUser');
    }
}
