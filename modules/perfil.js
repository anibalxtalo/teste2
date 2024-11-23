export function renderPerfil() {
    const contentDiv = document.getElementById('dynamic-content');
    contentDiv.innerHTML = `
        <style>
            .profile-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 20px;
                font-family: Arial, sans-serif;
                color: #333;
            }

            .card {
                width: 90%; /* Largura fixa de 90% */
                max-width: 600px; /* Limite máximo de largura */
                background-color: #fff;
                border: 1px solid #ddd;
                border-radius: 8px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                padding: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                flex-shrink: 0; /* Garante que o tamanho do card não encolha */
                flex-grow: 0; /* Garante que o tamanho do card não expanda */
            }

            .card-header {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 10px;
                text-align: center;
            }

            .profile-image-container {
                position: relative;
                width: 150px;
                height: 150px;
                border-radius: 50%;
                overflow: hidden;
                border: 3px solid #ddd;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                cursor: pointer;
            }

            .profile-image-container img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .dropdown-menu {
                display: none;
                position: absolute;
                top: 170px;
                left: 50%;
                transform: translateX(-50%);
                background-color: #fff;
                border: 1px solid #ddd;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                border-radius: 5px;
                z-index: 1000;
                width: 200px;
                text-align: left;
            }

            .dropdown-menu button {
                width: 100%;
                padding: 10px;
                background: none;
                border: none;
                text-align: left;
                cursor: pointer;
                font-size: 14px;
            }

            .dropdown-menu button:hover {
                background-color: #f4f4f4;
            }

            .info-section {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                margin-bottom: 10px;
            }

            .info-section span {
                font-size: 16px;
                font-weight: bold;
                color: #555;
            }

            .info-section p {
                margin: 0;
                font-size: 16px;
                color: #333;
                word-wrap: break-word; /* Garante que o texto não quebre o layout */
            }

            .info-section .edit-icon {
                cursor: pointer;
                color: #888;
            }
        </style>

        <div class="profile-container">
            <!-- Card 1: Foto de Perfil -->
            <div class="card">
                <div class="card-header">Foto de Perfil</div>
                <div class="profile-image-container" onclick="customToggleDropdown()">
                    <img id="profile-img" src="https://via.placeholder.com/150" alt="Foto do Perfil">
                    <div id="dropdown-menu" class="dropdown-menu">
                        <button onclick="customShowPhoto()">Mostrar foto</button>
                        <button onclick="customStartCamera()">Tirar foto</button>
                        <button onclick="customUploadPhoto()">Carregar foto</button>
                        <button onclick="customRemovePhoto()">Remover foto</button>
                    </div>
                </div>
            </div>

            <!-- Card 2: Informações do Usuário -->
            <div class="card">
                <div class="card-header">Informações do Usuário</div>
                <div class="info-section">
                    <span>Nome:</span>
                    <div style="display: flex; gap: 10px;">
                        <p id="name">Anibal Costa</p>
                        <i class="material-icons edit-icon" onclick="customEditField('name')">edit</i>
                    </div>
                </div>
                <div class="info-section">
                    <span>Recado:</span>
                    <div style="display: flex; gap: 10px;">
                        <p id="status">Olá! Eu estou usando WhatsApp.</p>
                        <i class="material-icons edit-icon" onclick="customEditField('status')">edit</i>
                    </div>
                </div>
            </div>
        </div>
    `;

    setupDropdown();
}

// Função setupDropdown corrigida
function setupDropdown() {
    const dropdown = document.getElementById('dropdown-menu');
    document.addEventListener('click', (event) => {
        const profileImage = document.querySelector('.profile-image-container');
        if (profileImage.contains(event.target)) {
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        } else {
            dropdown.style.display = 'none';
        }
    });
}

// Funções Auxiliares (adicionadas ao escopo global)
window.customToggleDropdown = function () {
    const menu = document.getElementById('dropdown-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
};

window.customShowPhoto = function () {
    const imgSrc = document.getElementById('profile-img').src;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`<img src="${imgSrc}" style="width:100%;height:100%;">`);
};

window.customEditField = function (fieldId) {
    const currentValue = document.getElementById(fieldId).innerText;
    const newValue = prompt(`Edite o campo`, currentValue);
    if (newValue) {
        document.getElementById(fieldId).innerText = newValue;
    }
};

window.customUploadPhoto = function () {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('profile-img').src = e.target.result;
        };
        reader.readAsDataURL(file);
    };
    fileInput.click();
};

window.customRemovePhoto = function () {
    document.getElementById('profile-img').src = "https://via.placeholder.com/150";
};

window.customStartCamera = function () {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const snapshotDiv = document.createElement('div');

    video.autoplay = true;
    snapshotDiv.style.textAlign = 'center';

    const takePhotoButton = document.createElement('button');
    takePhotoButton.innerText = 'Tirar Foto';
    takePhotoButton.onclick = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imgSrc = canvas.toDataURL('image/png');
        document.getElementById('profile-img').src = imgSrc;
        stopCamera();
    };

    const stopCamera = () => {
        video.srcObject.getTracks().forEach(track => track.stop());
        document.body.removeChild(snapshotDiv);
    };

    snapshotDiv.appendChild(video);
    snapshotDiv.appendChild(takePhotoButton);
    document.body.appendChild(snapshotDiv);

    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((error) => {
            console.error('Erro ao acessar a câmera:', error);
            document.body.removeChild(snapshotDiv);
        });
};
