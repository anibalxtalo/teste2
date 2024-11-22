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
            }

            .card {
                background-color: #f4f4f4;
                border: 1px solid #ddd;
                border-radius: 8px;
                padding: 15px;
                display: flex;
                align-items: center;
                gap: 15px;
                cursor: pointer;
                transition: background-color 0.3s, transform 0.2s;
            }

            .card:hover {
                background-color: #e0f7fa;
                transform: scale(1.02);
            }

            .icon {
                font-size: 24px;
                color: #00796b;
            }

            .card-title {
                font-size: 18px;
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
                <!-- Primeiro conjunto de cards -->
                <div class="card-set" id="set-1">
                    <div class="card" onclick="showNextSet(2)">
                        <span class="icon material-icons">person</span>
                        <span class="card-title">Conta</span>
                    </div>
                    <div class="card" onclick="showNextSet(3)">
                        <span class="icon material-icons">lock</span>
                        <span class="card-title">Privacidade</span>
                    </div>
                    <div class="card" onclick="showNextSet(4)">
                        <span class="icon material-icons">chat</span>
                        <span class="card-title">Conversas</span>
                    </div>
                </div>

                <!-- Segundo conjunto de cards -->
                <div class="card-set" id="set-2">
                    <div class="back-button" onclick="showPreviousSet()">
                        <span class="material-icons">arrow_back</span> Voltar
                    </div>
                    <div class="card">
                        <span class="icon material-icons">person_outline</span>
                        <span class="card-title">Editar Perfil</span>
                    </div>
                    <div class="card">
                        <span class="icon material-icons">delete</span>
                        <span class="card-title">Deletar Conta</span>
                    </div>
                </div>

                <!-- Terceiro conjunto de cards -->
                <div class="card-set" id="set-3">
                    <div class="back-button" onclick="showPreviousSet()">
                        <span class="material-icons">arrow_back</span> Voltar
                    </div>
                    <div class="card">
                        <span class="icon material-icons">visibility</span>
                        <span class="card-title">Gerenciar Bloqueios</span>
                    </div>
                    <div class="card">
                        <span class="icon material-icons">vpn_key</span>
                        <span class="card-title">Alterar Senha</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    setupNavigation();
}

function setupNavigation() {
    let currentSet = 0;

    // Exibe o próximo conjunto de cards
    window.showNextSet = function (setNumber) {
        const wrapper = document.getElementById('card-wrapper');
        currentSet = setNumber - 1; // Ajustar para índice zero
        wrapper.style.transform = `translateX(-${currentSet * 100}%)`;
    };

    // Volta ao conjunto anterior
    window.showPreviousSet = function () {
        const wrapper = document.getElementById('card-wrapper');
        currentSet = Math.max(0, currentSet - 1);
        wrapper.style.transform = `translateX(-${currentSet * 100}%)`;
    };
}
