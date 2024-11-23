// Exporta a função renderConfiguracoes
export function renderConfiguracoes() {
    // Obtém o elemento do DOM onde o conteúdo será renderizado
    const contentDiv = document.getElementById('dynamic-content');

    // Insere o HTML básico do módulo de configurações
    contentDiv.innerHTML = `
        <div class="card-container" id="card-group-1">
            <div class="card card-1" onclick="loadPage(1)">Card 1</div>
            <div class="card card-2" onclick="loadPage(2)">Card 2</div>
            <div class="card card-3" onclick="loadPage(3)">Card 3</div>
            <div class="card card-4" onclick="loadPage(4)">Card 4</div>
        </div>
    `;

    // Adiciona estilos dinamicamente
    const style = document.createElement('style');
    style.textContent = `
        .card-container {
    display: flex;
    flex-direction: column; /* Coloca os cards empilhados verticalmente */
    align-items: center;
    gap: 20px; /* Espaçamento entre os cards */
    width: 100%; /* Faz os cards ocuparem toda a largura disponível */
}
.card-container {
    display: flex;
    flex-direction: column; /* Coloca os cards empilhados verticalmente */
    align-items: center;
    gap: 20px; /* Espaçamento entre os cards */
    width: 100%; /* Faz os cards ocuparem toda a largura disponível */
}

.card {
    width: calc(100% - 20px); /* A largura será 100% da div menos margens */
    max-width: 500px; /* Define uma largura máxima */
    margin: 0 auto; /* Centraliza os cartões horizontalmente */
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    cursor: pointer;
}
        .card-1 {
            height: 70px;
        }

        .card-2 {
            height: 140px;
        }

        .card-3 {
            height: 210px;
        }

        .card-4 {
            height: 280px;
        }
    `;
    document.head.appendChild(style);
}

// Função global para carregar uma nova página (grupo de cards)
window.loadPage = function (cardNumber) {
    const currentGroup = document.getElementById('card-group-1');

    // Cria um novo grupo de cards
    const newGroup = document.createElement('div');
    newGroup.className = 'card-container';
    newGroup.id = `card-group-${cardNumber}`;
    newGroup.innerHTML = `
        <div class="card card-1" onclick="goBack()">Voltar</div>
    `;
    for (let i = 1; i <= cardNumber; i++) {
        newGroup.innerHTML += `<div class="card card-${cardNumber}">Novo Card ${i}</div>`;
    }

    const dynamicContent = document.getElementById('dynamic-content');
    dynamicContent.appendChild(newGroup);

    // Animação com GSAP
    gsap.fromTo(currentGroup, { x: 0 }, { x: '-100%', duration: 0.7, ease: 'power2.inOut' });
    gsap.fromTo(newGroup, { x: '100%' }, { x: 0, duration: 0.7, ease: 'power2.inOut', onComplete: () => {
        currentGroup.remove();
    } });
};

// Função global para voltar à página inicial (grupo inicial)
window.goBack = function () {
    const currentGroup = document.querySelector('.card-container:last-child');
    const previousGroup = document.createElement('div');
    previousGroup.className = 'card-container';
    previousGroup.id = 'card-group-1';
    previousGroup.innerHTML = `
        <div class="card card-1" onclick="loadPage(1)">Card 1</div>
        <div class="card card-2" onclick="loadPage(2)">Card 2</div>
        <div class="card card-3" onclick="loadPage(3)">Card 3</div>
        <div class="card card-4" onclick="loadPage(4)">Card 4</div>
    `;

    const dynamicContent = document.getElementById('dynamic-content');
    dynamicContent.appendChild(previousGroup);

    // Animação com GSAP
    gsap.fromTo(currentGroup, { x: 0 }, { x: '100%', duration: 0.7, ease: 'power2.inOut', onComplete: () => {
        currentGroup.remove();
    } });
    gsap.fromTo(previousGroup, { x: '-100%' }, { x: 0, duration: 0.7, ease: 'power2.inOut' });
};
