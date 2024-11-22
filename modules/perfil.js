export function renderPerfil() {
    const contentDiv = document.getElementById('dynamic-content');
    contentDiv.innerHTML = `
        <style>
            .profile-container {
                text-align: center;
                padding: 20px;
                font-family: Arial, sans-serif;
                color: #333;
            }

            .profile-image-container {
                position: relative;
                margin: 0 auto 20px;
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

            .profile-info {
                margin-top: 20px;
                text-align: left;
                padding: 20px;
                background: #f9f9f9;
                border-radius: 5px;
            }

            .info-section {
                margin-bottom: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .info-section p {
                margin: 0;
                font-size: 16px;
            }

            .info-section .edit-icon {
                cursor: pointer;
                color: #888;
            }

            .info-section span {
                font-size: 14px;
                font-weight: bold;
                color: #555;
            }
        </style>

        <div class="profile-container">
            <div class="profile-image-container" onclick="toggleDropdown()">
                <img id="profile-img" src="https://via.placeholder.com/150" alt="Foto do Perfil">
                <div id="dropdown-menu" class="dropdown-menu">
                    <button onclick="showPhoto()">Mostrar foto</button>
                    <button onclick="startCamera()">Tirar foto</button>
                    <button onclick="uploadPhoto()">Carregar foto</button>
                    <button onclick="removePhoto()">Remover foto</button>
                </div>
            </div>
            <div class="profile-info">
                <div class="info-section">
                    <span>Seu nome</span>
                    <div style="display: flex; gap: 10px;">
                        <p id="name">Anibal Costa</p>
                        <i class="material-icons edit-icon" onclick="editField('name')">edit</i>
                    </div>
                </div>
                <div class="info-section">
                    <span>Recado</span>
                    <div style="display: flex; gap: 10px;">
                        <p id="status">Olá! Eu estou usando WhatsApp.</p>
                        <i class="material-icons edit-icon" onclick="editField('status')">edit</i>
                    </div>
                </div>
            </div>
        </div>
    `;

    setupDropdown();
}

// Funções Auxiliares
function setupDropdown() {
    const profileImg = document.getElementById('profile-img');
    const dropdownMenu = document.getElementById('dropdown-menu');

    profileImg.addEventListener('click', () => {
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', (e) => {
        if (!profileImg.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.style.display = 'none';
        }
    });
}

function showPhoto() {
    const imgSrc = document.getElementById('profile-img').src;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`<img src="${imgSrc}" style="width:100%;height:100%;">`);
}

function editField(fieldId) {
    const currentValue = document.getElementById(fieldId).innerText;
    const newValue = prompt(`Edite o campo`, currentValue);
    if (newValue) {
        document.getElementById(fieldId).innerText = newValue;
    }
}

function uploadPhoto() {
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
}

function removePhoto() {
    document.getElementById('profile-img').src = "https://via.placeholder.com/150";
}

function startCamera() {
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
}
