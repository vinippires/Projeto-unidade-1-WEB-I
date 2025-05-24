// Verifica se o usuário está logado
const user = JSON.parse(localStorage.getItem("loggedUser"));
if (!user) {
    window.location.href = "login-page.html";
} else {
    // 1. Atualiza a área .login_register, se existir
    const loginRegister = document.querySelector(".login_register");
    if (loginRegister) {
        loginRegister.innerHTML = `
            <div style="display: flex; align-items: center;">
            <a href="user_profile_page.html">
                <img src="${user.image || 'https://placehold.co/40x40/png?text=User'}" alt="User Image" class="user-img" style="width: 42px; height: 42px; border-radius: 50%; vertical-align: middle; margin-right: 8px;">
                <span id="user_name_display" style="color: white; margin-right: 16px; font-size: 20px; line-height: 1;"><b>${user.name}</b></span>
            </a>
            <a href="../paginas/my-products.html" style="text-decoration: none; color: white; margin-right: 12px; font-size: 16px;">Meus Produtos</a>
            <a href="#" id="logoutButton" onclick="logout()" style="color: white; font-size: 16px;">Sair</a>
            </div>`;
    }

    // 2. Atualiza a área #Bem-vindo, se existir
    const welcomeMessage = document.getElementById("Bem-vindo");
    if (welcomeMessage) {
        welcomeMessage.innerHTML = `Bem-vindo, ${user.name}`;
    }

    // 3. Atualiza a área #user_name_display, se existir
    const userNameDisplay = document.getElementById("user_name_display");
    if (userNameDisplay) {
        userNameDisplay.innerText = user.name;
    }

    // 4. Adiciona botão de logout na área .user-info, se existir
    const userInfo = document.querySelector(".user-info");
    if (userInfo) {
        //change image to user image
        const userImage = document.getElementsByClassName("user-img");
        userImage.src = user.image || "https://placehold.co/150x150/png?text=User+Image"; // Use uma imagem padrão se não houver imagem do usuário

        const logoutButton = document.createElement("a");
        logoutButton.innerText = "Sair";
        logoutButton.id = "logoutButton";
        logoutButton.className = "logout-button";
        logoutButton.style.marginLeft = "20px";
        logoutButton.href = "#";
        logoutButton.onclick = logout;
        userInfo.appendChild(logoutButton);
    }

}
//adiciona foto do usuário na área .user-img
    document.addEventListener('DOMContentLoaded', function () {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    const userImage = document.querySelector('.user-img');
    if (loggedUser && loggedUser.userImage) {
      userImage.src = loggedUser.userImage;
    } else {
      userImage.src = 'https://placehold.co/150x150/png?text=User+Image';
    }
    });

// Função para fazer logout
function logout() {
    localStorage.removeItem("loggedUser");
    window.location.href = "login-page.html";
}
