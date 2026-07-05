const form = document.getElementById('formCadastro');

if (form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        let cadastro = [];
        const username = document.getElementById('login').value.trim();
        const password = document.getElementById('senha').value;

        if (!username || !password) return;

        const cadastroLogin = {
            login: username,
            senha: password,
        };

        // Carrega dados existentes do localStorage
        if (localStorage.getItem('cadastroLogin')) {
            try {
                cadastro = JSON.parse(localStorage.getItem('cadastroLogin'));
            } catch (e) {
                console.error("Erro ao ler cadastroLogin do localStorage", e);
                cadastro = [];
            }
        }

        // Verifica se o usuário já existe
        const usuarioExistente = cadastro.find(user => user.login === username);

        if (usuarioExistente) {
            // Se o usuário existe, valida se a senha está correta
            if (usuarioExistente.senha === password) {
                mostrarModal("Bem-vindo!", `Login realizado com sucesso! Olá, ${username}.`, "sucesso");
            } else {
                mostrarModal("Erro de Acesso", "Senha incorreta para este usuário. Tente novamente.", "aviso");
            }
        } else {
            // Se o usuário não existe, realiza o cadastro automaticamente
            cadastro.push(cadastroLogin);
            localStorage.setItem('cadastroLogin', JSON.stringify(cadastro));
            mostrarModal("Cadastro Realizado", `Conta criada e login efetuado com sucesso! Olá, ${username}.`, "sucesso");
        }
    });
}

// Funções do Modal Customizado
function mostrarModal(titulo, mensagem, tipo) {
    const modal = document.getElementById("customModal");
    const modalIcon = document.getElementById("modalIcon");
    const modalTitle = document.getElementById("modalTitle");
    const modalMessage = document.getElementById("modalMessage");

    if (!modal) return;

    if (tipo === "sucesso") {
        modalIcon.innerHTML = "✅";
        modalIcon.style.color = "#4CAF50";
    } else if (tipo === "aviso") {
        modalIcon.innerHTML = "⚠️";
        modalIcon.style.color = "#FFC107";
    }

    modalTitle.innerText = titulo;
    modalMessage.innerText = mensagem;
    modal.style.display = "flex";
}

function confirmarLogin() {
    const modal = document.getElementById("customModal");
    if (modal) {
        modal.style.display = "none";
    }
    
    const modalTitle = document.getElementById("modalTitle").innerText;
    // Redireciona para o catálogo apenas se o login/cadastro deu certo
    if (modalTitle !== "Erro de Acesso") {
        window.location.href = "index.html";
    }
}