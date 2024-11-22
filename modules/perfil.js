export function renderPerfil() {
    const contentDiv = document.getElementById('dynamic-content');
    contentDiv.innerHTML = `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
            <h2 style="font-size: 24px; font-weight: bold; color: #333;">Perfil</h2>
            <div style="text-align: center; margin-top: 20px;">
                <div style="position: relative; display: inline-block;">
                    <img id="profile-img" src="https://via.placeholder.com/150" alt="Foto do Perfil"
                        style="width: 150px; height: 150px; border-radius: 50%; object-fit: cover; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: none; 
                                background: rgba(0,0,0,0.6); border-radius: 50%; align-items: center; justify-content: center; color: white; cursor: pointer;"
                         id="edit-overlay" onclick="toggleDropdown()">
                        <span style="font-size: 14px;">MUDAR FOTO DO PERFIL</span>
                    </div>
                </div>
                <div id="dropdown-menu" style="display: none; position: absolute; top: 180px; left: 50%; transform: translateX(-50%);
                                               background: white; border: 1px solid #ddd; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
                    <button onclick="showPhoto()" style="display: block; width: 100%; padding: 10px; border: none; background: none; text-align: left; cursor: pointer;">Mostrar foto</button>
                    <button onclick="startCamera()" style="display: block; width: 100%; padding: 10px; border: none; background: none; text-align: left; cursor: pointer;">Tirar foto</button>
                    <button onclick="uploadPhoto()" style="display: block; width: 100%; padding: 10px; border: none; background: none; text-align: left; cursor: pointer;">Carregar foto</button>
                    <button onclick="removePhoto()" style="display: block; width: 100%; padding: 10px; border: none; background: none; text-align: left; cursor: pointer;">Remover foto</button>
                </div>
            </div>
            <div style="margin-top: 20px; background: #f9f9f9; padding: 20px; border-radius: 8px;">
                <div style="margin-bottom: 15px;">
                    <p style="font-weight: bold; color: #4caf50;">Seu nome</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <p id="name" style="margin: 0;">Anibal Costa</p>
                        <i class="material-icons" onclick="editField('name')" style="cursor: pointer; color: #888;">edit</i>
                    </div>
                    <p style="font-size: 12px; color: #aaa;">Esse não é seu nome de usuário e nem seu PIN. Esse nome será exibido para seus contatos do WhatsApp.</p>
                </div>
                <div>
                    <p style="font-weight: bold; color: #4caf50;">Recado</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <p id="status" style="margin: 0;">Olá! Eu estou usando WhatsApp.</p>
                        <i class="material-icons" onclick="editField('status')" style="cursor: pointer; color: #888;">edit</i>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Configuração de eventos para mostrar a sobreposição ao passar o mouse na imagem
    const profileImg = document.querySelector('.profile-image');
    const editOverlay = document.getElementById('edit-overlay');
    profileImg.addEventListener('mouseenter', () => {
        editOverlay.style.display = 'flex';
    });
    profileImg.addEventListener('mouseleave', () => {
        editOverlay.style.display = 'none';
    });
}
