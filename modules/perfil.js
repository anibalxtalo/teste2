export function renderPerfil() {
    const contentDiv = document.getElementById('dynamic-content');
    contentDiv.innerHTML = `
        <div style="padding: 20px; font-family: Arial, sans-serif; color: #333;">
            <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 20px;">Perfil</h2>
            <div style="text-align: center;">
                <div style="position: relative; display: inline-block;">
                    <img id="profile-img" src="https://via.placeholder.com/150" alt="Foto do Perfil"
                        style="width: 150px; height: 150px; border-radius: 50%; object-fit: cover; border: 3px solid #ddd;">
                    <div id="edit-overlay" 
                         style="display: none; position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
                                background: rgba(0, 0, 0, 0.6); color: white; font-size: 14px; 
                                border-radius: 50%; display: flex; justify-content: center; align-items: center; 
                                cursor: pointer;">
                        MUDAR FOTO DO PERFIL
                    </div>
                </div>
                <div id="dropdown-menu" 
                     style="display: none; margin-top: 10px; background: white; border: 1px solid #ddd; 
                            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); border-radius: 8px; width: 200px; text-align: left;">
                    <button style="display: block; padding: 10px; width: 100%; border: none; background: none; cursor: pointer;" onclick="showPhoto()">Mostrar foto</button>
                    <button style="display: block; padding: 10px; width: 100%; border: none; background: none; cursor: pointer;" onclick="startCamera()">Tirar foto</button>
                    <button style="display: block; padding: 10px; width: 100%; border: none; background: none; cursor: pointer;" onclick="uploadPhoto()">Carregar foto</button>
                    <button style="display: block; padding: 10px; width: 100%; border: none; background: none; cursor: pointer;" onclick="removePhoto()">Remover foto</button>
                </div>
            </div>
            <div style="margin-top: 30px; background: #f9f9f9; padding: 20px; border-radius: 8px;">
                <div style="margin-bottom: 20px;">
                    <p style="font-weight: bold; color: #4CAF50; margin: 0;">Seu nome</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <p id="name" style="margin: 0; font-size: 16px;">Anibal Costa</p>
                        <i class="material-icons" onclick="editField('name')" style="cursor: pointer; color: #888;">edit</i>
                    </div>
                    <p style="font-size: 12px; color: #aaa; margin-top: 5px;">Esse não é seu nome de usuário e nem seu PIN. Esse nome será exibido para seus contatos do WhatsApp.</p>
                </div>
                <div>
                    <p style="font-weight: bold; color: #4CAF50; margin: 0;">Recado</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <p id="status" style="margin: 0; font-size: 16px;">Olá! Eu estou usando WhatsApp.</p>
                        <i class="material-icons" onclick="editField('status')" style="cursor: pointer; color: #888;">edit</i>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Configuração de eventos para a sobreposição ao passar o mouse na foto
    const profileImg = document.getElementById('profile-img');
    const editOverlay = document.getElementById('edit-overlay');
    profileImg.addEventListener('mouseenter', () => {
        editOverlay.style.display = 'flex';
    });
    profileImg.addEventListener('mouseleave', () => {
        editOverlay.style.display = 'none';
    });

    // Configuração para abrir e fechar o menu suspenso
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
