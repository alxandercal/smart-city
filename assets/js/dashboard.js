import { observeAuth, logoutUser, getCurrentUserProfile } from "./auth.js";

const navUserName = document.getElementById('navUserName');
const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');
const favoriteCity = document.getElementById('favoriteCity');
const logoutBtn = document.getElementById('logoutBtn');

observeAuth(async (user) => {
    if (!user) {
        // Si no hay usuario, mandarlo al login
        window.location.href = './login.html';
        return;
    }

    // Si hay usuario, traer sus datos de Firestore
    try {
        const profile = await getCurrentUserProfile(user.uid);
        if (profile) {
            navUserName.textContent = profile.name;
            userName.textContent = profile.name;
            userEmail.textContent = profile.email;
            favoriteCity.textContent = profile.favoriteCity || 'No definida';
        }
    } catch (error) {
        console.error("Error cargando perfil:", error);
    }
});

logoutBtn?.addEventListener('click', async () => {
    await logoutUser();
    window.location.href = './login.html';
});