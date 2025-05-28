const user = JSON.parse(localStorage.getItem("loggedUser"));

// Adiciona a verificação de estar na login-page.html antes de redirecionar
if (!user && !window.location.pathname.endsWith('login-page.html') && !window.location.pathname.endsWith('register-page.html')) {
    // Se não estiver logado E não estiver na página de login/registro, redireciona
    window.location.href = "../paginas/login-page.html";
} else if (user) {
    // 1. Atualiza a área .login_register, se existir
    const loginRegister = document.querySelector(".login_register");
    if (loginRegister) {
        const cartIconSvg = '<svg fill="white" viewBox="0 0 24 24" width="28" height="28" xmlns="http://www.w3.org/2000/svg"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20.01 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>';
        const menuIconSvg = '<svg fill="white" viewBox="0 0 24 24" width="28" height="28" xmlns="http://www.w3.org/2000/svg"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>';

        loginRegister.innerHTML = `
            <div style="display: flex; align-items: center;">
                <a href="../paginas/user_profile_page.html" style="display: flex; align-items: center; text-decoration: none; color: white; margin-right: 16px;">
                    <img src="${user.userImage || 'https://placehold.co/40x40/png?text=User'}" alt="User Image" class="user-img" style="width: 42px; height: 42px; border-radius: 50%; vertical-align: middle; margin-right: 8px;">
                    <span id="user_name_display_header" style="font-size: 18px; line-height: 1; color: white;"><b>${user.name}</b></span>
                </a>
                <a href="../paginas/cart-page.html" id="cartIconLink" title="Carrinho" style="color: white; margin-right: 20px; text-decoration: none; display:flex; align-items:center;">
                    ${cartIconSvg}
                </a>
                <div class="dropdown">
                    <button class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        ${menuIconSvg}
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="../paginas/my-products.html">Meus Produtos</a></li>
                        <li><a class="dropdown-item" href="../paginas/user_profile_page.html">Meu Perfil</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" id="logoutButtonHeader" onclick="logout()">Sair</a></li>
                </ul>
                </div>
            </div>`;

        const hamburgerIconLink = document.getElementById("hamburgerIconLink");
        const dropdownMenu = loginRegister.querySelector(".dropdown-menu");

        if (hamburgerIconLink && dropdownMenu) {
            hamburgerIconLink.addEventListener("click", function(event) {
                event.preventDefault();
                event.stopPropagation(); // Impede que o clique feche o menu imediatamente
                dropdownMenu.style.display = dropdownMenu.style.display === "none" ? "block" : "none";
            });

            // Fechar o dropdown se clicar fora
            document.addEventListener("click", function(event) {
                if (dropdownMenu.style.display === 'block') {
                    if (!hamburgerIconLink.contains(event.target) && !dropdownMenu.contains(event.target)) {
                        dropdownMenu.style.display = "none";
                    }
                }
            });
        }
    }

    // 2. Atualiza a área #Bem-vindo, se existir
    const welcomeMessage = document.getElementById("Bem-vindo");
    if (welcomeMessage) {
        welcomeMessage.innerHTML = `Bem-vindo, ${user.name}`;
    }

    // 3. Atualiza a área #user_name_display em my-products.html
    const userNameDisplayMyProducts = document.querySelector("#my-products-page #user_name_display");

    // 4. Atualiza imagem de usuário na área .user-info (ex: em my-products.html)
    const userInfo = document.querySelector(".user-info"); // Pode ser a div em my-products.html
    if (userInfo) {
        const userImageEl = userInfo.querySelector(".user-img");
        if (userImageEl) {
            userImageEl.src = user.userImage || "https://placehold.co/150x150/png?text=User+Image";
        }

    }
}

document.addEventListener('DOMContentLoaded', function () {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    if (loggedUser) {
        document.querySelectorAll('.user-img:not(.login_register .user-img)').forEach(imgElement => {
             imgElement.src = loggedUser.userImage || 'https://placehold.co/150x150/png?text=User+Image';
        });
        const userNameDisplaySide = document.querySelector('.user-info #user_name_display');
        if(userNameDisplaySide) {
            userNameDisplaySide.textContent = loggedUser.name;
        }
    }
});

// Função para fazer logout
function logout() {
    localStorage.removeItem("loggedUser");
    window.location.href = "../paginas/login-page.html";
}