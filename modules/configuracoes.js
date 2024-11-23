export function renderConfiguracoes() {
    const contentDiv = document.getElementById('dynamic-content');
    contentDiv.innerHTML = `
        <style>
            .config-container {
                width: 100%;
                max-width: 600px;
                margin: auto;
                overflow: hidden;
                position: relative;
            }

            .card-wrapper {
                display: flex;
                transition: transform 0.3s ease-in-out;
            }

            .card-set {
                flex: 0 0 100%;
                display: grid;
                grid-template-columns: 1fr;
                gap: 10px;
                padding: 20px;
                align-content: flex-start; /* Alinha os cards ao topo */
            }

            .card {
                background-color: #f4f4f4;
                border: 1px solid #ddd;
                border-radius: 8px;
                padding: 20px;
                display: flex;
                align-items: flex-start; /* Alinha o conteúdo do card ao topo */
                gap: 15px;
                cursor: pointer;
                transition: background-color 0.3s, transform 0.2s;
            }

            .card:hover {
                background-color: #e0f7fa;
                transform: scale(1.02);
            }

            .icon {
                font-size: 28px;
                color: #00796b;
            }

            .card-title {
                font-size: 20px;
                color: #333;
            }

            .back-button {
                cursor: pointer;
                font-size: 18px;
                color: #00796b;
                display: flex;
                align-items: center;
                gap: 5px;
                margin-bottom: 15px;
            }

            .back-button:hover {
                text-decoration: underline;
            }
        </style>

        <div class="config-container">
            <div class="card-wrapper" id="card-wrapper">
                <!-- Inicialmente vazio, preenchido dinamicamente -->
            </div>
        </div>
    `;

    loadSet(1); // Carregar o primeiro conjunto de cards inicialmente
}

function loadSet(setNumber) {
    const wrapper = document.getElementById('card-wrapper');

    // Requisição AJAX para carregar o conjunto de cards
    fetch(`../data/set-${setNumber}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao carregar o conjunto ${setNumber}`);
            }
            return response.json();
        })
        .then(data => {
            // Criar o HTML dos cards
            const cardSet = document.createElement('div');
            cardSet.classList.add('card-set');

            if (setNumber > 1) {
                // Adiciona botão de "Voltar"
                const backButton = document.createElement('div');
                backButton.classList.add('back-button');
                backButton.innerHTML = `
                    <span class="material-icons">arrow_back</span> Voltar
                `;
                backButton.addEventListener('click', () => showPreviousSet());
                cardSet.appendChild(backButton);
            }

            // Adiciona os cards
            data.cards.forEach(card => {
                const cardDiv = document.createElement('div');
                cardDiv.classList.add('card');
                cardDiv.innerHTML = `
                    <span class="icon material-icons">${card.icon}</span>
                    <span class="card-title">${card.title}</span>
                `;
                if (card.nextSet) {
                    cardDiv.addEventListener('click', () => showNextSet(card.nextSet));
                }
                cardSet.appendChild(cardDiv);
            });

            wrapper.appendChild(cardSet);
        })
        .catch(error => {
            console.error(`Erro ao carregar o conjunto ${setNumber}:`, error);
        });
}

let currentSet = 0;

// Exibe o próximo conjunto de cards
function showNextSet(setNumber) {
    currentSet = setNumber - 1; // Ajustar para índice zero
    const wrapper = document.getElementById('card-wrapper');

    // Verifica se o conjunto já foi carregado
    if (wrapper.children[currentSet]) {
        wrapper.style.transform = `translateX(-${currentSet * 100}%)`;
    } else {
        loadSet(setNumber); // Carrega o novo conjunto
        setTimeout(() => {
            wrapper.style.transform = `translateX(-${currentSet * 100}%)`;
        }, 300); // Garante que o conteúdo seja carregado antes de animar
    }
}

// Volta ao conjunto anterior
function showPreviousSet() {
    const wrapper = document.getElementById('card-wrapper');
    currentSet = Math.max(0, currentSet - 1);
    wrapper.style.transform = `translateX(-${currentSet * 100}%)`;
}
