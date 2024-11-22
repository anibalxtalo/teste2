export function renderPerfil() {
    const contentDiv = document.getElementById('dynamic-content');
    contentDiv.innerHTML = `
        <style>
            .custom-profile-container {
                padding: 20px;
                font-family: Arial, sans-serif;
                color: #333;
            }
            .custom-profile-header {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 20px;
            }
            .custom-profile-image-container {
                text-align: center;
                margin-bottom: 20px;
                position: relative;
            }
            .custom-profile-image {
                width: 150px;
                height: 150px;
                border-radius: 50%;
                object-fit: cover;
                border: 3px solid #ddd;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                cursor: pointer;
            }
            .custom-profile-dropdown {
                display: none;
                position: absolute;
                margin-top: 10px;
                background: white;
                border: 1px solid #ddd;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                border-radius: 8px;
                width: 200px;
                text-align: left;
                z-index: 1000;
            }
            .custom-profile-dropdown button {
                display: block;
                padding: 10px;
                width: 100%;
                border: none;
                background: none;
                text-align: left;
                cursor: pointer;
                font-size: 14px;
            }
            .custom-profile-dropdown button:hover {
                background-color: #f4f4f4;
            }
            .custom-profile-info {
                margin-top: 30px;
                background: #f9f9f9;
                padding: 20px;
                border-radius: 8px;
            }
            .custom-profile-info-section {
                margin-bottom: 20px;
            }
            .custom-profile-info-section p {
                margin: 0;
            }
            .custom-profile-info-section .custom-edit-icon {
                cursor: pointer;
                color: #888;
            }
        </style>
        <div class="custom-profile-container">
            <h2 class="custom-profile-header">Perfil</h2>
            <div class="custom-profile-image-container">
                <img id="custom-profile-img" src="https://via.placeholder.com/150" alt="Foto do Perfil" class="custom-profile-image" onclick="customToggleDropdown()">
                <div id="custom-dropdown-menu" class="custom-profile-dropdown">
                    <button onclick="customShowPhoto()">Mostrar foto</button>
                    <button onclick="customStartCamera()">Tirar foto</button>
                    <button onclick="customUploadPhoto()">Carregar foto</button>
                    <button onclick="customRemovePhoto()">Remover foto</button>
                </div>
            </div>
            <div class="custom-profile-info">
                <div class="custom-profile-info-section">
                    <p style="font-weight: bold; color: #4CAF50;">Seu nome</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <p id="custom-name" style="margin: 0; font-size: 16px;">Anibal Costa</p>
                        <i class="material-icons custom-edit-icon" onclick="customEditField('custom-name')">edit</i>
                    </div>
                    <p style="font-size: 12px; color: #aaa; margin-top: 5px;">Esse não é seu nome de usuário e nem seu PIN. Esse nome será exibido para seus contatos do WhatsApp.</p>
                </div>
                <div class="custom-profile-info-section">
                    <p style="font-weight: bold; color: #4CAF50;">Recado</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <p id="custom-status" style="margin: 0; font-size: 16px;">Olá! Eu estou usando WhatsApp.</p>
                        <i class="material-icons custom-edit-icon" onclick="customEditField('custom-status')">edit</i>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Configuração de eventos para o menu suspenso
    const profileImg = document.getElementById('custom-profile-img');
    const dropdownMenu = document.getElementById('custom-dropdown-menu');
    profileImg.addEventListener('click', () => {
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });
    document.addEventListener('click', (e) => {
        if (!profileImg.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.style.display = 'none';
        }
    });
}

// Funções Auxiliares
function customShowPhoto() {
    const imgSrc = document.getElementById('custom-profile-img').src;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`<img src="${imgSrc}" style="width:100%;height:100%;">`);
}

function customEditField(fieldId) {
    const currentValue = document.getElementById(fieldId).innerText;
    const newValue = prompt(`Edite o campo`, currentValue);
    if (newValue) {
        document.getElementById(fieldId).innerText = newValue;
    }
}

function customUploadPhoto() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('custom-profile-img').src = e.target.result;
        };
        reader.readAsDataURL(file);
    };
    fileInput.click();
}

function customRemovePhoto() {
    document.getElementById('custom-profile-img').src = "https://via.placeholder.com/150";
}
