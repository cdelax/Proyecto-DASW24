
function manageShowFormContainer() {
    // Obtener los botones y formularios
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Evento para mostrar el formulario de Iniciar Sesión
    loginBtn.addEventListener('click', () => {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    });

    // Evento para mostrar el formulario de Registro
    registerBtn.addEventListener('click', () => {
        registerForm.style.display = 'block';
        loginForm.style.display = 'none';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    manageShowFormContainer();  // Llamamos a la función después de que el DOM esté listo
});
