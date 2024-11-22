function renderPerfil() {
    const contentDiv = document.getElementById('dynamic-content');
    contentDiv.innerHTML = `
        <div class="profile-container">
            <div class="profile-image" onclick="toggleDropdown()">
                <img src="https://via.placeholder.com/150" alt="Foto do Perfil">
                <div class="edit-overlay">Mudar foto do perfil</div>
            </div>
            <div class="profile-info">
                <p>Nome: Anibal Costa</p>
                <p>Recado: Olá! Eu estou usando WhatsApp.</p>
            </div>
        </div>
    `;
}

function toggleDropdown() {
    alert("Dropdown funcionalidade não implementada.");
}
