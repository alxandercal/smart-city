import { hideAlert,showAlert,setButtonLoading,loginUser,observerAuth,getFirebaseErrorMessage } from "./auth.js"

const form=document.getElementById('loginForm')
const emailInput =document.getElementById('loginEmail')
const passwordInput =document.getElementById('passwordInput')
const loginBtn =document.getElementById('loginBtn')

observerAuth((user)=>{
    if(user){
        window.location.href = './../../dashboard.html'//check❌
    }

})

form?.getElementById('loginForm')?.addEventListener('submit',(e)=>{
    e.preventDefault()//evita refresh de la pagina
    hideAlert('logingAlert')
    const email=emailInput.value.trim()
    const password =passwordInput.value.trim()
    if(!email||!password){
        showAlert('loginAlert','Por favor, completa todos los campos')
        return
    }


    try {
        setButtonLoading(loginBtn,true,'<i class="bi bi-box-arrow-in-right me-2"></i>Iniciar Sesion','Iniciando sesión') 
        await loginUser({email,password})
        window.location.href = './../../dashboard.html'
    } catch (error) {
        showAlert('loginAlert',getFirebaseErrorMessage(error))
    }finally{
        setButtonLoading(loginBtn,false,'<i class="bi bi-box-arrow-in-right me-2"></i>Iniciar Sesion')
    }

    
})
