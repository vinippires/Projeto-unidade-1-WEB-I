// Verifica se o usuário está logado
const user = JSON.parse(localStorage.getItem("loggedUser"));
if (!user) {
    window.location.href = "login-page.html";
} else {
    // 1. Atualiza a área .login_register, se existir
    const loginRegister = document.querySelector(".login_register");
    if (loginRegister) {
        loginRegister.innerHTML = `
            <a href="../paginas/my-products.html">Meus Produtos</a>
            <a href="#" id="logoutButton" onclick="logout()">Sair</a>`;
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

// Função para fazer logout
function logout() {
    localStorage.removeItem("loggedUser");
    window.location.href = "login-page.html";
}
