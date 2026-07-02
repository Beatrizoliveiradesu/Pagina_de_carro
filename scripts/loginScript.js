const form = document.getElementById('formCadastro')
    form.addEventListener("submit", function(event){
        event.preventDefault()
        let cadastro = []
        const cadastroLogin = {
            login : document.getElementById('login').value,
            senha : document.getElementById('senha').value,
        }
         if(localStorage.cadastroLogin){
        cadastro = JSON.parse(localStorage.getItem('cadastroLogin'))
        }
        cadastro.push(cadastroLogin)
        localStorage.cadastroLogin = JSON.stringify(cadastro)
        document.getElementById('formCadastro')
    })