<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <style>
        body {
            font-family: Arial, sans-serif;
        }

        .profile-container {
            text-align: center;
            padding: 20px;
        }

        .profile-image {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            overflow: hidden;
            margin: 0 auto;
            position: relative;
            cursor: pointer;
        }

        .profile-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .edit-overlay {
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            font-size: 14px;
        }

        .profile-image:hover .edit-overlay {
            display: flex;
        }

        .profile-info {
            margin-top: 20px;
        }

        .info-section {
            margin: 10px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #ddd;
            padding-bottom: 10px;
        }

        .info-section span {
            font-size: 16px;
            font-weight: bold;
            color: #555;
        }

        .info-section i {
            cursor: pointer;
            color: #888;
        }

        .dropdown-menu {
            display: none;
            position: absolute;
            top: 160px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #fff;
            border: 1px solid #ccc;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            z-index: 10;
            width: 200px;
            border-radius: 5px;
        }

        .dropdown-menu button {
            width: 100%;
            padding: 10px;
            background: none;
            border: none;
            text-align: left;
            cursor: pointer;
        }

        .dropdown-menu button:hover {
            background-color: #f4f4f4;
        }

        .hidden {
            display: none;
        }
    </style>
</head>
<body>
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

    <input type="file" id="file-input" class="hidden" accept="image/*" onchange="loadUploadedPhoto(event)">
    <video id="camera" class="hidden" autoplay></video>
    <canvas id="snapshot" class="hidden"></canvas>

    <script>
        const database = {
            phone: "21 99999999",
            name: "Anibal Costa",
            status: "Olá! Eu estou usando WhatsApp.",
            photo: "https://via.placeholder.com/150"
        };

        document.getElementById('profile-img').src = database.photo;
        document.getElementById('name').innerText = database.name;
        document.getElementById('status').innerText = database.status;

        function toggleDropdown() {
            const menu = document.getElementById('dropdown-menu');
            menu.style.display = menu.style.display === "block" ? "none" : "block";
        }

        function showPhoto() {
            const img = document.getElementById('profile-img').src;
            const newWindow = window.open("", "_blank");
            newWindow.document.write(`<img src="${img}" style="width:100%;height:100%;">`);
        }

        function editField(field) {
            const currentValue = document.getElementById(field).innerText;
            const newValue = prompt(`Edite ${field === "name" ? "seu nome" : "seu recado"}`, currentValue);
            if (newValue) {
                document.getElementById(field).innerText = newValue;
                database[field] = newValue; // Atualiza o "banco de dados"
            }
        }

        function uploadPhoto() {
            document.getElementById('file-input').click();
        }

        function loadUploadedPhoto(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = e.target.result;
                document.getElementById('profile-img').src = img;
                database.photo = img; // Atualiza o "banco de dados"
            };
            reader.readAsDataURL(file);
        }

        function startCamera() {
            const video = document.getElementById('camera');
            const canvas = document.getElementById('snapshot');
            const context = canvas.getContext('2d');
            navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
                video.srcObject = stream;
                video.classList.remove('hidden');
                video.addEventListener('click', () => {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    context.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const img = canvas.toDataURL('image/png');
                    document.getElementById('profile-img').src = img;
                    database.photo = img; // Atualiza o "banco de dados"
                    video.srcObject.getTracks().forEach(track => track.stop());
                    video.classList.add('hidden');
                });
            });
        }

        function removePhoto() {
            const placeholder = "https://via.placeholder.com/150";
            document.getElementById('profile-img').src = placeholder;
            database.photo = placeholder; // Atualiza o "banco de dados"
        }
    </script>
</body>
</html>
