export function renderCards() {
    const contentDiv = document.getElementById('dynamic-content');

    contentDiv.innerHTML = `
        <style>
            .card-container {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;
            }

            .card {
                width: 95%;
                height: 70px;
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
        </style>

        <div class="card-container" id="card-group-1">
            <div class="card card-1" onclick="loadPage(1)">Card 1</div>
            <div class="card card-2" onclick="loadPage(2)">Card 2</div>
            <div class="card card-3" onclick="loadPage(3)">Card 3</div>
            <div class="card card-4" onclick="loadPage(4)">Card 4</div>
        </div>
    `;

    setupNavigation(contentDiv);
}

function setupNavigation(contentDiv) {
    window.loadPage = (cardNumber) => {
        const currentGroup = contentDiv.querySelector('.card-container');

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

        contentDiv.appendChild(newGroup);

        // Anima o movimento dos grupos usando GSAP
        gsap.fromTo(currentGroup, { x: 0 }, { x: '-100%', duration: 0.7, ease: 'power2.inOut' });
        gsap.fromTo(newGroup, { x: '100%' }, { x: 0, duration: 0.7, ease: 'power2.inOut', onComplete: () => {
            currentGroup.remove(); // Remove o grupo antigo após a animação
        } });
    };

    window.goBack = () => {
        const currentGroup = contentDiv.querySelector('.card-container:last-child');
        const previousGroup = document.createElement('div');
        previousGroup.className = 'card-container';
        previousGroup.id = 'card-group-1';
        previousGroup.innerHTML = `
            <div class="card card-1" onclick="loadPage(1)">Card 1</div>
            <div class="card card-2" onclick="loadPage(2)">Card 2</div>
            <div class="card card-3" onclick="loadPage(3)">Card 3</div>
            <div class="card card-4" onclick="loadPage(4)">Card 4</div>
        `;

        contentDiv.appendChild(previousGroup);

        // Anima o movimento dos grupos usando GSAP
        gsap.fromTo(currentGroup, { x: 0 }, { x: '100%', duration: 0.7, ease: 'power2.inOut', onComplete: () => {
            currentGroup.remove(); // Remove a página atual após a animação
        } });
        gsap.fromTo(previousGroup, { x: '-100%' }, { x: 0, duration: 0.7, ease: 'power2.inOut' });
    };
}
