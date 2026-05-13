// Base de dados de produtos
const produtos = [
    {
        id: 1,
        nome: "Ração Premium para Cães",
        categoria: "alimentos",
        preco: 89.90,
        descricao: "Ração balanceada com nutrientes completos para cães adultos",
        imagem: "https://picsum.photos/400/300?random=1"
    },
    {
        id: 2,
        nome: "Bola de Borracha para Brincar",
        categoria: "brinquedos",
        preco: 24.90,
        descricao: "Bola resistente e segura para diversão do seu pet",
        imagem: "https://picsum.photos/400/300?random=2"
    },
    {
        id: 3,
        nome: "Coleira Ajustável Colorida",
        categoria: "acessorios",
        preco: 39.90,
        descricao: "Coleira confortável com regulagem fácil e fivela segura",
        imagem: "https://picsum.photos/400/300?random=3"
    },
    {
        id: 4,
        nome: "Shampoo Neutro para Pets",
        categoria: "higiene",
        preco: 32.90,
        descricao: "Shampoo suave indicado para banho em casa",
        imagem: "https://picsum.photos/400/300?random=4"
    },
    {
        id: 5,
        nome: "Ração para Gatos Premium",
        categoria: "alimentos",
        preco: 79.90,
        descricao: "Ração nutritiva especial para gatos adultos",
        imagem: "https://picsum.photos/400/300?random=5"
    },
    {
        id: 6,
        nome: "Pente Desembaraçador",
        categoria: "higiene",
        preco: 28.90,
        descricao: "Pente profissional para remover nós e pelos soltos",
        imagem: "https://picsum.photos/400/300?random=6"
    },
    {
        id: 7,
        nome: "Cama Confortável para Pets",
        categoria: "acessorios",
        preco: 149.90,
        descricao: "Cama macia e confortável para o descanso do seu pet",
        imagem: "https://picsum.photos/400/300?random=7"
    },
    {
        id: 8,
        nome: "Brinquedo de Corda para Puxar",
        categoria: "brinquedos",
        preco: 19.90,
        descricao: "Brinquedo de corda durável para brincadeiras interativas",
        imagem: "https://picsum.photos/400/300?random=8"
    },
    {
        id: 9,
        nome: "Petiscos Crocantes",
        categoria: "alimentos",
        preco: 18.90,
        descricao: "Petiscos saudáveis e saborosos para recompensa",
        imagem: "https://picsum.photos/400/300?random=9"
    },
    {
        id: 10,
        nome: "Coleira LED com Luz Noturna",
        categoria: "acessorios",
        preco: 59.90,
        descricao: "Coleira com LED para segurança noturna",
        imagem: "https://picsum.photos/400/300?random=10"
    },
    {
        id: 11,
        nome: "Caixinha de Transporte",
        categoria: "acessorios",
        preco: 129.90,
        descricao: "Transportadora segura e confortável para viagens",
        imagem: "https://picsum.photos/400/300?random=11"
    },
    {
        id: 12,
        nome: "Comedouro Automático",
        categoria: "acessorios",
        preco: 199.90,
        descricao: "Comedouro com temporizador para refeições automáticas",
        imagem: "https://picsum.photos/400/300?random=12"
    }
];

// Carrinho de compras
let carrinho = [];
let produtoSelecionado = null;

// Função para renderizar produtos
function renderizarProdutos(filtro = 'todos') {
    const grid = document.getElementById('produtos-grid');
    grid.innerHTML = '';

    const produtosFiltrados = filtro === 'todos' 
        ? produtos 
        : produtos.filter(p => p.categoria === filtro);

    produtosFiltrados.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'produto-card';
        card.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}" class="produto-imagem" onerror="this.src='https://picsum.photos/400/300?random='+(Math.random())">
            <div class="produto-info">
                <div class="produto-categoria">${produto.categoria}</div>
                <div class="produto-nome">${produto.nome}</div>
                <div class="produto-descricao">${produto.descricao}</div>
                <div class="produto-preco">R$ ${produto.preco.toFixed(2)}</div>
                <button class="btn-ver-detalhes" onclick="abrirDetalhes(${produto.id})">Ver Detalhes</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Função de filtro
function filtrarProdutos(categoria) {
    // Atualizar botões ativos
    document.querySelectorAll('.btn-filtro').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Renderizar produtos filtrados
    renderizarProdutos(categoria);
}

// Função para abrir modal de detalhes
function abrirDetalhes(idProduto) {
    produtoSelecionado = produtos.find(p => p.id === idProduto);
    
    if (produtoSelecionado) {
        document.getElementById('detalhes-nome').textContent = produtoSelecionado.nome;
        document.getElementById('detalhes-descricao').textContent = produtoSelecionado.descricao;
        document.getElementById('detalhes-preco').textContent = produtoSelecionado.preco.toFixed(2);
        document.getElementById('detalhes-imagem').src = produtoSelecionado.imagem;
        document.getElementById('detalhes-imagem').onerror = function() {
            this.src = 'https://picsum.photos/400/300?random='+(Math.random());
        };
        document.getElementById('qtd').value = 1;
        
        document.getElementById('modal-detalhes').classList.add('ativo');
    }
}

// Função para fechar modal de detalhes
function fecharDetalhes() {
    document.getElementById('modal-detalhes').classList.remove('ativo');
}

// Função para adicionar ao carrinho do modal de detalhes
function adicionarAoCarrinho() {
    if (produtoSelecionado) {
        const quantidade = parseInt(document.getElementById('qtd').value);
        adicionarProdutoAoCarrinho(produtoSelecionado, quantidade);
        fecharDetalhes();
    }
}

// Função para adicionar produto ao carrinho
function adicionarProdutoAoCarrinho(produto, quantidade = 1) {
    const itemExistente = carrinho.find(item => item.id === produto.id);

    if (itemExistente) {
        itemExistente.quantidade += quantidade;
    } else {
        carrinho.push({
            ...produto,
            quantidade: quantidade
        });
    }

    atualizarCarrinho();
    mostrarNotificacao(`${produto.nome} adicionado ao carrinho!`);
}

// Função para atualizar carrinho
function atualizarCarrinho() {
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    document.getElementById('qtd-carrinho').textContent = totalItens;
    
    atualizarPrecosCarrinho();
}

// Função para atualizar preços do carrinho
function atualizarPrecosCarrinho() {
    const subtotal = carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
    const frete = carrinho.length > 0 ? 10.00 : 0;
    const total = subtotal + frete;

    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('frete').textContent = frete.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2);
}

// Função para abrir carrinho
function abrirCarrinho() {
    const modalCarrinho = document.getElementById('modal-carrinho');
    const itensContainer = document.getElementById('carrinho-itens');

    if (carrinho.length === 0) {
        itensContainer.innerHTML = '<p style="text-align: center; padding: 20px; color: #999;">Seu carrinho está vazio</p>';
    } else {
        itensContainer.innerHTML = carrinho.map(item => `
            <div class="carrinho-item">
                <div class="carrinho-item-nome">${item.nome} (x${item.quantidade})</div>
                <div class="carrinho-item-preco">R$ ${(item.preco * item.quantidade).toFixed(2)}</div>
                <button class="btn-remover" onclick="removerDoCarrinho(${item.id})">Remover</button>
            </div>
        `).join('');
    }

    atualizarPrecosCarrinho();
    modalCarrinho.classList.add('ativo');
}

// Função para fechar carrinho
function fecharCarrinho() {
    document.getElementById('modal-carrinho').classList.remove('ativo');
}

// Função para remover item do carrinho
function removerDoCarrinho(idProduto) {
    carrinho = carrinho.filter(item => item.id !== idProduto);
    atualizarCarrinho();
    abrirCarrinho(); // Reabrir para atualizar
}

// Função para iniciar compra
function iniciarCompra() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    fecharCarrinho();
    
    // Gerar número do pedido
    const numeroPedido = Math.floor(Math.random() * 900000) + 100000;
    document.getElementById('numero-pedido').textContent = numeroPedido;

    // Mostrar modal de confirmação
    setTimeout(() => {
        document.getElementById('modal-confirmacao').classList.add('ativo');
    }, 300);
}

// Função para fechar confirmação de compra
function fecharConfirmacao() {
    document.getElementById('modal-confirmacao').classList.remove('ativo');
    
    // Limpar carrinho
    carrinho = [];
    atualizarCarrinho();
}

// Função para scroll suave
function scrollPara(seletor) {
    const elemento = document.querySelector(seletor);
    elemento.scrollIntoView({ behavior: 'smooth' });
}

// Função para mostrar notificação
function mostrarNotificacao(mensagem) {
    const notificacao = document.createElement('div');
    notificacao.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4caf50;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 2000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    notificacao.textContent = mensagem;
    document.body.appendChild(notificacao);

    setTimeout(() => {
        notificacao.remove();
    }, 3000);
}

// Fechar modais ao clicar fora deles
window.onclick = function(event) {
    const modalCarrinho = document.getElementById('modal-carrinho');
    const modalDetalhes = document.getElementById('modal-detalhes');
    const modalConfirmacao = document.getElementById('modal-confirmacao');

    if (event.target === modalCarrinho) {
        fecharCarrinho();
    }
    if (event.target === modalDetalhes) {
        fecharDetalhes();
    }
    if (event.target === modalConfirmacao) {
        fecharConfirmacao();
    }
};

// Inicializar ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    renderizarProdutos('todos');

    // Adicionar estilo para animação
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
});
