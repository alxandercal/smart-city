import { hideAlert,showAlert,setButtonLoading,registerUser,getFirebaseErrorMessage } from './auth.js';

const form=document.getElementById('registerForm')
const nameInput=document.getElementById('name')
const emailInput=document.getElementById('email')
const cityInput=document.getElementById('city')
const passwordInput=document.getElementById('password')
const confirmPasswordInput=document.getElementById('confirmPassword')
const registerBtn=document.getElementById('registerBtn')
const successBox = document.getElementById('registerSuccess')




form?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    hideAlert('registerAlert');
    successBox.classList.add('d-none')
    successBox.textContent=''

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmpassword = confirmPasswordInput.value.trim();

    if (!name || !email || !password || !confirmpassword) {
        showAlert('registerAlert', 'Todos los datos son obligatorios');
        return;
    }
    if (password !== confirmpassword) {
        showAlert('registerAlert', 'Las contraseñas no son iguales.');
        return;
    }
    //Agregar que la contrasea no sea menor a 6 caracteres --if--
    

    try {
        setButtonLoading(registerBtn,true,'<i class="bi bi-person-check me-2"></i>Crear cuenta','Creando cuenta...') 
        await registerUser({name, email, password, favoriteCity})
        successBox.textContent='Cuenta creada correctamente'
        successBox.classList.remove=('d-none')
        setTimeout(()=>{
            window.location.href = './../../dashboard'
        },1200)
        window.location.href = './../../dashboard.html'
    } catch (error) {
        showAlert('registerAlert',getFirebaseErrorMessage(error))
    }finally{
        setButtonLoading(registerBtn,false,'<i class="bi bi-person-check me-2"></i>Crear cuenta')
        }
    


});