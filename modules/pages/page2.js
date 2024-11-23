export function renderPage(container, previousContent) {
    container.innerHTML = `
        <style>
            .card {
                width: 90%;
                margin: 20px auto;
                background-color: #ffffff;
                border: 1px solid #ddd;
                border-radius: 8px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                text-align: center;
                font-size: 16px;
                font-weight: bold;
                padding: 20px;
                cursor: pointer;
            }

            .back-button {
                margin-bottom: 20px;
                background-color: #42a5f5;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                text-align: center;
                font-size: 14px;
            }

            .back-button:hover {
                background-color: #1e88e5;
            }
        </style>

        <button class="back-button" onclick="goBack()">Voltar</button>
        <div class="card">Novo Card 1</div>
        <div class="card">Novo Card 2</div>
    `;

    // Função para retornar à página anterior
    window.goBack = function () {
        container.classList.remove('slide-in');
        container.classList.add('slide-out');
        setTimeout(() => {
            container.innerHTML = previousContent;
            container.classList.add('slide-in');
        }, 300); // Tempo da animação de retorno
    };
}
