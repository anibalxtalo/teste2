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
            }

            /* Alturas específicas */
            .card-1 {
                height: 70px; /* Altura base */
            }

            .card-2 {
                height: 140px; /* 2 vezes a altura base */
            }

            .card-3 {
                height: 210px; /* 3 vezes a altura base */
            }

            .card-4 {
                height: 280px; /* 4 vezes a altura base */
            }
        </style>

        <div class="middle-div">
            <div class="card card-1">Card 1</div>
            <div class="card card-2">Card 2</div>
            <div class="card card-3">Card 3</div>
            <div class="card card-4">Card 4</div>
        </div>
    `;
}
