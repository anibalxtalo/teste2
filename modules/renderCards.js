export function renderDynamicCards() {
    const dynamicContent = document.getElementById('dynamic-content');
    dynamicContent.innerHTML = `
        <div id="dynamic-content">
            <div class="card-container" id="card-group-1">
                <div class="card card-1" onclick="loadPage(1)">Card 1</div>
                <div class="card card-2" onclick="loadPage(2)">Card 2</div>
                <div class="card card-3" onclick="loadPage(3)">Card 3</div>
                <div class="card card-4" onclick="loadPage(4)">Card 4</div>
            </div>
        </div>
    `;

    function loadPage(cardNumber) {
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

        dynamicContent.appendChild(newGroup);

        // Anima o movimento dos grupos
        gsap.fromTo(currentGroup, { x: 0 }, { x: '-100%', duration: 0.7, ease: 'power2.inOut' });
        gsap.fromTo(newGroup, { x: '100%' }, { x: 0, duration: 0.7, ease: 'power2.inOut', onComplete: () => {
            currentGroup.remove(); // Remove o grupo antigo após a animação
        } });
    }

    function goBack() {
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

        dynamicContent.appendChild(previousGroup);

        // Anima o movimento dos grupos
        gsap.fromTo(currentGroup, { x: 0 }, { x: '100%', duration: 0.7, ease: 'power2.inOut', onComplete: () => {
            currentGroup.remove(); // Remove o grupo atual após a animação
        } });
        gsap.fromTo(previousGroup, { x: '-100%' }, { x: 0, duration: 0.7, ease: 'power2.inOut' });
    }
}
