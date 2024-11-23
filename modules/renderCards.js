export function renderCards() {
    const contentDiv = document.getElementById('dynamic-content');
    contentDiv.innerHTML = `
        <style>
            .middle-div {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                height: 100%;
                padding: 10px;
                background-color: #f4f4f4;
                position: relative;
                overflow: hidden;
            }

            .card {
                width: 95%;
                margin-bottom: 10px;
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
                cursor: pointer;
                transition: transform 0.3s ease, opacity 0.3s ease;
            }

            .card:hover {
                transform: scale(1.05);
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

            .slide-in {
                animation: slideIn 0.3s forwards;
            }

            .slide-out {
                animation: slideOut 0.3s forwards;
            }

            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                }
                to {
                    transform: translateX(0);
                }
            }

            @keyframes slideOut {
                from {
                    transform: translateX(0);
                }
                to {
                    transform: translateX(-100%);
                }
            }
        </style>

        <div class="middle-div">
            <div class="card card-1" onclick="loadModule('page1')">Card 1</div>
            <div class="card card-2" onclick="loadModule('page2')">Card 2</div>
            <div class="card card-3" onclick="loadModule('page3')">Card 3</div>
            <div class="card card-4" onclick="loadModule('page4')">Card 4</div>
        </div>
    `;
}

// Navegação dinâmica com transições
function loadModule(pageName) {
    const contentDiv = document.getElementById('dynamic-content');
    const currentContent = contentDiv.innerHTML;

    // Adiciona animação de saída
    contentDiv.classList.add('slide-out');
    setTimeout(() => {
        import(`./pages/${pageName}.js`)
            .then((module) => {
                // Atualiza o conteúdo
                contentDiv.innerHTML = '';
                module.renderPage(contentDiv, currentContent);
                contentDiv.classList.add('slide-in');
            })
            .catch((err) => {
                console.error(`Erro ao carregar o módulo ${pageName}:`, err);
            });
    }, 300); // Tempo da animação de saída
}
