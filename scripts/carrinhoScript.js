// Banco de dados dos carros (utilizando caminhos locais para as imagens)
const bancoDeCarros = [
    { 
        nome: 'F8 Spider', 
        marca: 'Ferrari', 
        categoria: 'Superesportivo', 
        preco: 3900000, 
        descricao: 'A Ferrari F8 Spider é um conversível de alto desempenho que combina o design aerodinâmico de Maranello com a emoção de dirigir ao ar livre. Equipada com um motor V8 Biturbo de 720 cavalos.',
        img: 'assets/ferrarif8.jpg' 
    },
    { 
        nome: 'Aventador SVJ', 
        marca: 'Lamborghini', 
        categoria: 'Superesportivo', 
        preco: 6900000, 
        descricao: 'A Lamborghini Aventador SVJ é um dos superesportivos mais insanos já fabricados. Equipada com um motor V12 NA, vai de 0 a 100 km/h em 2.8 segundos.',
        img: 'assets/AventadorSVJ.jpg' 
    },
    { 
        nome: 'Continental GT', 
        marca: 'Bentley', 
        categoria: 'Luxo', 
        preco: 1700000, 
        descricao: 'O Bentley Continental GT é um cupê de luxo de altíssimo desempenho, famoso por seu acabamento artesanal e motorização potente. A jornada mais requintada possível.',
        img: 'assets/Bentley.jpg' 
    },
    { 
        nome: 'M3 Competition', 
        marca: 'BMW', 
        categoria: 'Esportivo', 
        preco: 800000, 
        descricao: 'A BMW M3 Competition é um sedã voltado para a pista e praticidade familiar. Equipada com um motor 3.0 de 6 cilindros, ela entrega muita adrenalina.',
        img: 'assets/bmwM3.jpg' 
    },
    { 
        nome: 'RS6 Avant', 
        marca: 'Audi', 
        categoria: 'Esportivo', 
        preco: 1200000, 
        descricao: 'A perua familiar definitiva e um dos carros mais brutais em aceleração. Uma combinação perfeita de design, espaço e um motor V8 insano.',
        img: 'assets/audiRS6.jpg' 
    },
    { 
        nome: '911 Carrera S', 
        marca: 'Porsche', 
        categoria: 'Esportivo', 
        preco: 1000000, 
        descricao: 'O ícone atemporal. O 911 Carrera S entrega dirigibilidade pura e tecnologia de ponta, equipado com o clássico motor boxer.',
        img: 'assets/porshe911.jpg' 
    }

];

// Inicializa o carrinho recuperando dados do localStorage
let carrinho = [];
if (localStorage.getItem('carrinhoReservas')) {
    try {
        carrinho = JSON.parse(localStorage.getItem('carrinhoReservas'));
    } catch (e) {
        console.error("Erro ao carregar o carrinho do localStorage", e);
        carrinho = [];
    }
}

// Função utilitária para formatar em Reais (BRL)
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Função que renderiza a vitrine de carros
function renderizarVitrine(lista) {
    const grid = document.getElementById('grid-carros');
    if (!grid) return;
    
    grid.innerHTML = ''; 

    lista.forEach(carro => {
        grid.innerHTML += `
            <div class="car-card">
                <img src="${carro.img}" alt="${carro.nome}" class="car-image">
                <div class="car-content">
                    <h3 class="car-title">${carro.nome}</h3>
                    <p class="car-desc">${carro.descricao}</p>
                    <div class="car-meta"><strong>Marca:</strong> ${carro.marca}</div>
                    <div class="car-meta"><strong>Categoria:</strong> ${carro.categoria}</div>
                    <div class="car-price">Preço: ${formatarMoeda(carro.preco)}</div>
                    <button class="btn-add" onclick="adicionarAoCarrinho('${carro.nome}', ${carro.preco})">ADICIONAR À RESERVA</button>
                </div>
            </div>
        `;
    });
}

// Filtra a vitrine conforme dropdown de categoria
function filtrarVitrine() {
    const categoriaSelecionada = document.getElementById('filtroCategoria').value;
    
    if (categoriaSelecionada === 'Todos') {
        renderizarVitrine(bancoDeCarros);
    } else {
        const carrosFiltrados = bancoDeCarros.filter(carro => carro.categoria === categoriaSelecionada);
        renderizarVitrine(carrosFiltrados);
    }
}

// Adiciona um carro à lista de reserva
function adicionarAoCarrinho(nome, preco) {
    let produto = carrinho.find(item => item.nome === nome);
    if (produto) {
        produto.qtd++;
    } else {
        carrinho.push({ nome: nome, preco: preco, qtd: 1 });
    }
    salvarCarrinho();
}

// Altera a quantidade de um item no carrinho (aumenta ou diminui)
function alterarQuantidade(nome, delta) {
    let produto = carrinho.find(item => item.nome === nome);
    if (produto) {
        produto.qtd += delta;
        if (produto.qtd <= 0) {
            carrinho = carrinho.filter(item => item.nome !== nome);
        }
        salvarCarrinho();
    }
}

// Exclui completamente um item do carrinho
function excluirDoCarrinho(nome) {
    carrinho = carrinho.filter(item => item.nome !== nome);
    salvarCarrinho();
}

// Salva o carrinho no localStorage e atualiza a interface
function salvarCarrinho() {
    localStorage.setItem('carrinhoReservas', JSON.stringify(carrinho));
    atualizarCarrinho();
}

// Atualiza o painel lateral do carrinho e calcula o total
function atualizarCarrinho() {
    const lista = document.getElementById("carrinho");
    const totalSpan = document.getElementById("total");
    if (!lista || !totalSpan) return;

    if (carrinho.length === 0) {
        lista.innerHTML = "O carrinho está vazio.";
        lista.style.color = "#aaa";
        totalSpan.innerHTML = "R$ 0,00";
        return;
    }

    let html = "";
    let total = 0;

    carrinho.forEach(item => {
        let subtotal = item.preco * item.qtd;
        total += subtotal;
        html += `
        <div class="item">
            <div class="item-info">
                <span style="color: white; font-weight: bold;">${item.nome}</span>
                <span style="color: #aaa; font-size: 0.8rem;">${formatarMoeda(item.preco)}</span>
            </div>
            <div class="item-controls">
                <button class="btn-control" onclick="alterarQuantidade('${item.nome}', -1)">-</button>
                <span class="item-qty">${item.qtd}</span>
                <button class="btn-control" onclick="alterarQuantidade('${item.nome}', 1)">+</button>
                <button class="btn-remover" onclick="excluirDoCarrinho('${item.nome}')">X</button>
            </div>
        </div>`;
    });

    lista.innerHTML = html;
    lista.style.color = "white";
    totalSpan.innerHTML = formatarMoeda(total);
}

// Finaliza a reserva
function finalizarPedido() {
    if (carrinho.length === 0) {
        alert("Sua lista de reserva está vazia!");
        return;
    }
    alert("✅ Reserva processada com sucesso!");
    carrinho = [];
    salvarCarrinho();
}

// Garante que a vitrine e o carrinho inicializem corretamente após o carregamento da página
document.addEventListener("DOMContentLoaded", () => {
    renderizarVitrine(bancoDeCarros);
    atualizarCarrinho();
});