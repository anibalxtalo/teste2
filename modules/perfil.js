export function renderPerfil() {
    const contentDiv = document.getElementById('dynamic-content');
    contentDiv.innerHTML = `
        <style>
            .profile-container {
                padding: 20px;
                font-family: Arial, sans-serif;
                color: #333;
            }
            .profile-container h2 {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 20px;
            }
            .profile-image-container {
                text-align: center;
                margin-bottom: 20px;
            }
            .profile-image-container img {
                width: 150px;
                height: 150px;
                border-radius: 50%;
                object-fit: cover;
                border: 3px solid #ddd;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            }
            .profile-image-container .edit-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: none;
                background: rgba(0, 0, 0, 0.6);
                color: white;
                font-size: 14px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
            }
            .profile-image-container:hover .edit-overlay {
                display: flex;
            }
            .dropdown-menu {
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
            .dropdown-menu button {
                display: block;
                padding: 10px;
                width: 100%;
                border: none;
                background: none;
                text-align: left;
                cursor: pointer;
                font-size: 14px;
            }
            .dropdown-menu button:hover {
                background-color: #f4f4f4;
            }
            .profile-info {
                margin-top: 30px;
                background: #f9f9f9;
                padding: 20px;
                border-radius: 8px;
            }
            .info-section {
                margin-bottom: 20px;
            }
            .info-section p {
                margin: 0;
            }
            .info-section .edit-icon {
                cursor: pointer;
                color: #888;
            }
        </style>
        <div class="profile-container">
            <h2>Perfil</h2>
            <div class="profile-image-container">
                <img id="profile-img" src="https://via.placeholder.com/150" alt="Foto do Perfil">
                <div class="edit-overlay" onclick="toggleDropdown()">MUDAR FOTO DO PERFIL</div>
                <div class="dropdown-menu" id="dropdown-menu">
                    <button onclick="showPhoto()">Mostrar foto</button>
                    <button onclick="startCamera()">Tirar foto</button>
                    <button onclick="uploadPhoto()">Carregar foto</button>
                    <button onclick="removePhoto()">Remover foto</button>
                </div>
            </div>
            <div class="profile-info">
                <div class="info-section">
                    <p style="font-weight: bold; color: #4CAF50;">Seu nome</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <p id="name" style="margin: 0; font-size: 16px;">Anibal Costa</p>
                        <i class="material-icons edit-icon" onclick="editField('name')">edit</i>
                    </div>
                    <p style="font-size: 12px; color: #aaa; margin-top: 5px;">Esse não é seu nome de usuário e nem seu PIN. Esse nome será exibido para seus contatos do WhatsApp.</p>
                </div>
                <div class="info-section">
                    <p style="font-weight: bold; color: #4CAF50;">Recado</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <p id="status" style="margin: 0; font-size: 16px;">Olá! Eu estou usando WhatsApp.</p>
                        <i class="material-icons edit-icon" onclick="editField('status')">edit</i>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Configuração de eventos para o menu suspenso
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
