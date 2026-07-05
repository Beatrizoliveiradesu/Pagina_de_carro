const produto = [
    {
        nome: 'F8 Spider', 
        marca: 'Ferrari', 
        categoria: 'Superesportivo', 
        preco: 3900000, 
        imagem: 'assets/ferrarif8.jpg', 
        descricao: 'A Ferrari F8 Spider é um conversível de alto desempenho que combina o design aerodinâmico de Maranello com a emoção de dirigir com o teto aberto. Equipada com um motor V8 biturbo de 720 cavalos'
    },
    {
        nome: 'Aventador SVJ', 
        marca: 'Lamborghini', 
        categoria: 'Superesportivo', 
        preco: 8000000, 
        imagem: 'assets/AventadorSVJ.jpg',
        descricao: 'A Lamborghini Aventador SVJ é um dos superesportivos mais extremos já fabricados. Equipada com um motor 6.5 V12 aspirado de 770 cv, atinge os 100 km/h em 2,8 segundos.'
    },
    {
        nome: 'Continental GT', 
        marca: 'Bentley', 
        categoria: 'Luxo', 
        preco: 2500000, 
        imagem: 'assets/Bentley.jpg',
        descricao: 'O Bentley Continental GT é um cupê de luxo de altíssimo desempenho, famoso por unir acabamento artesanal e motores potentes. A geração mais recente possui um sistema híbrido com motor 4.0 V8 biturbo.'
    },
    {
        nome: 'M3 Competition', 
        marca: 'BMW', 
        categoria: 'Esportivo', 
        preco: 895000, 
        imagem: 'assets/bmwM3.jpg',
        descricao: 'O BMW M3 Competition é um super sedã de luxo que alia a praticidade familiar à pura adrenalina das pistas. Equipado com um motor 3.0 litros de 6 cilindros biturbo, ele entrega 510 cavalos de potência.'
    },
    {
        nome: 'RS6 Avant', 
        marca: 'Audi', 
        categoria: 'Esportivo', 
        preco: 800000, 
        imagem: 'assets/audiRS6.jpg',
        descricao: 'Audi RS6 Avant é a união definitiva entre o alto desempenho de um supercarro e a funcionalidade de uma perua familiar. Equipado com um motor 4.0 V8 biturbo e sistema híbrido leve (MHEV).'    
    },
    {
        nome: '911 Carrera S', 
        marca: 'Porsche', 
        categoria: 'Esportivo', 
        preco: 1000000, 
        imagem: 'assets/porshe911.jpg',
        descricao: 'O Porsche 911 Carrera S é a personificação do esportivo de alto desempenho. Equipado com um motor boxer 3.0 biturbo de 6 cilindros, ele entrega 450 cv e torque de 54 kgfm'
    }
];

const catalogo = document.getElementById("catalogo");

// Função para formatar em Reais (BRL)
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Renderiza a vitrine de modelos na Home
function renderizar(Lista) {
    if (!catalogo) return;
    catalogo.innerHTML = "";

    Lista.forEach(p => {
        catalogo.innerHTML += `
            <div class="produto-card">
                <div class="carro-foto-container">
                    <img src="${p.imagem}" alt="${p.nome}" class="carro-foto">
                </div>
                <h3>${p.nome}</h3>
                <div class="carro-tags">
                    <span class="tag-brand">${p.marca}</span>
                    <span class="tag-category">${p.categoria}</span>
                </div>
                <p class="carro-descricao">${p.descricao}</p>
                <div class="carro-preco-container">
                    <span class="preco-label">Valor da Reserva</span>
                    <span class="preco-valor">${formatarMoeda(p.preco)}</span>
                </div>
                <button class="btn-add" onclick="adicionarAoCarrinhoERedirecionar('${p.nome}', ${p.preco})">Adicionar à Reserva</button>
            </div>
        `;
    });
}

// Inicializa a vitrine da home
renderizar(produto);

// Filtra categorias na Home
function filtrarCategoria() {
    const categoria = document.getElementById("filtroCategoria").value;

    if (categoria === "Todos") {
        renderizar(produto);
    } else {
        const filtrados = produto.filter(p => p.categoria === categoria);
        renderizar(filtrados);
    }
}

// Adiciona o produto ao localStorage e redireciona para a página de reservas
function adicionarAoCarrinhoERedirecionar(nome, preco) {
    let carrinho = [];
    
    // Recupera o carrinho do localStorage se existir
    if (localStorage.getItem('carrinhoReservas')) {
        try {
            carrinho = JSON.parse(localStorage.getItem('carrinhoReservas'));
        } catch (e) {
            console.error("Erro ao ler carrinho do localStorage", e);
            carrinho = [];
        }
    }
    
    // Verifica se o item já está no carrinho
    let item = carrinho.find(p => p.nome === nome);
    if (item) {
        item.qtd++;
    } else {
        carrinho.push({ nome: nome, preco: preco, qtd: 1 });
    }
    
    // Salva o carrinho de volta no localStorage
    localStorage.setItem('carrinhoReservas', JSON.stringify(carrinho));
    
    // Redireciona para a página do carrinho
    window.location.href = "carrinho.html";
}