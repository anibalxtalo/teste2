function renderPerfil() {
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

function toggleDropdown() {
    const menu = document.getElementById('dropdown-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function showPhoto() {
    const imgSrc = document.getElementById('profile-img').src;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`<img src="${imgSrc}" style="width:100%;height:100%;">`);
}

function editField(field) {
    const currentValue = document.getElementById(field).innerText;
    const newValue = prompt(`Edite ${field === "name" ? "seu nome" : "seu recado"}`, currentValue);
    if (newValue) {
        document.getElementById(field).innerText = newValue;
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
            const imgSrc = e.target.result;
            document.getElementById('profile-img').src = imgSrc;
        };
        reader.readAsDataURL(file);
    };
    fileInput.click();
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

function removePhoto() {
    document.getElementById('profile-img').src = "https://via.placeholder.com/150";
}
