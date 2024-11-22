export function renderPerfil() {
    const contentDiv = document.getElementById('dynamic-content');
    contentDiv.innerHTML = `
        <div class="profile-container">
            <div class="profile-image" onclick="toggleDropdown()">
                <img id="profile-img" src="https://via.placeholder.com/150" alt="Foto do Perfil">
                <div class="edit-overlay">Mudar foto do perfil</div>
            </div>
            <div class="dropdown-menu" id="dropdown-menu">
                <button onclick="showPhoto()">Mostrar foto</button>
                <button onclick="startCamera()">Tirar foto</button>
                <button onclick="uploadPhoto()">Carregar foto</button>
                <button onclick="removePhoto()">Remover foto</button>
            </div>
            <div class="profile-info">
                <div class="info-section">
                    <span>Seu nome</span>
                    <i class="material-icons" onclick="editField('name')">edit</i>
                </div>
                <p id="name">Anibal Costa</p>
                <div class="info-section">
                    <span>Recado</span>
                    <i class="material-icons" onclick="editField('status')">edit</i>
                </div>
                <p id="status">Olá! Eu estou usando WhatsApp.</p>
            </div>
        </div>
    `;
}
