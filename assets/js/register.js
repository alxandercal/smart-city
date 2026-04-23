import { 
    hideAlert, 
    showAlert, 
    setButtonLoading, 
    registerUser, 
    logoutUser,
    getFirebaseErrorMessage 
} from "./auth.js";

const form = document.getElementById('registerForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const cityInput = document.getElementById('city');
const passInput = document.getElementById('password');
const confirmPassInput = document.getElementById('confirmPassword');
const registerBtn = document.getElementById('registerBtn');

form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideAlert('registerAlert');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const favoriteCity = cityInput.value.trim();
    const password = passInput.value;
    const confirmPassword = confirmPassInput.value;

    // Validaciones básicas
    if (!name || !email || !password) {
        showAlert('registerAlert', 'Nombre, correo y contraseña son obligatorios.');
        return;
    }

    if (password !== confirmPassword) {
        showAlert('registerAlert', 'Las contraseñas no coinciden.');
        return;
    }

    if (password.length < 6) {
        showAlert('registerAlert', 'La contraseña debe tener al menos 6 caracteres.');
        return;
    }

    try {
        setButtonLoading(registerBtn, true, '<i class="bi bi-person-check me-2"></i>Crear cuenta', 'Registrando...');
        
        await registerUser({ name, email, password, favoriteCity });
        
        // Forzamos el cierre de sesión para que no entre directo al dashboard
        await logoutUser();

        // Mostramos mensaje de éxito antes de redirigir
        const successEl = document.getElementById('registerSuccess');
        successEl.textContent = "¡Cuenta creada! Redirigiendo al login...";
        successEl.classList.remove('d-none');

        setTimeout(() => {
            window.location.href = './login.html';
        }, 2000);

    } catch (error) {
        showAlert('registerAlert', getFirebaseErrorMessage(error));
    } finally {
        setButtonLoading(registerBtn, false, '<i class="bi bi-person-check me-2"></i>Crear cuenta');
    }
});