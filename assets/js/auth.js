import { createUserWithEmailAndPassword,signInWithEmailAndPassword, onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


import { 
    doc,
    setDoc,
    getDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import { auth, db } from './firebase-config.js';

// --- FUNCIONES DE ALERTA ---

export function showAlert(elementId, message) {
    const alert = document.getElementById(elementId);
    if (!alert) return;
    alert.textContent = message;
    alert.classList.remove('d-none');
}

export function hideAlert(elementId) {
    const alert = document.getElementById(elementId);
    if (!alert) return;
    alert.classList.add('d-none');
    alert.textContent = '';
}

export async function registerUser({name, email,password,favoriteCity}){
    const credential =await createUserWithEmailAndPassword(auth,email,password)
    const user = credential.user

    await setDoc(doc(db,"users",user.uid),{
        uid:user.uid,
        name,
        email,
        favoriteCity: favoriteCity || '',//checar aqui ❌
        createdAt:serverTimestamp()
    })
   return user
}


export async function loginUser({email,password}){
    const credential = await signInWithEmailAndPassword(auth,email,password)
    return credential.user
 }

export async function getUserCurrentProfile(uid){
  const docUser=doc(db,'users',uid)
  const user=await getDoc(docUser)

  if (!user.exists()) return null

  return user.data()
}

export function observerAuth(callback){
  return onAuthStateChanged(auth,callback)
} 

export async function logoutUser(){
  await signOut(auth)

}

export function getFirebaseErrorMessage(error) {
  
  console.log("Full Error Object:", error); // Add this line
  console.log("Error Code:", error?.code);   // Add this line

  const code = error?.code || '';
  
  switch(code) {
    case 'auth/email-already-in-use':
      return 'Este correo ya está registrado';
    case 'auth/invalid-email':
      return 'El correo no es válido';
    case 'auth/weak-password':
      return 'La contraseña es muy débil';
    case 'auth/invalid-credential':
      return 'Correo o contraseña inválida';
    case 'auth/user-not-found':
      return 'No existe cuenta con este correo';
    case 'auth/wrong-password':
      return 'El password es incorrecto';
    case 'auth/too-many-requests':
      return 'Demasiados intentos, intenta más tarde';
    default:
      return 'Error inesperado, por favor intenta de nuevo';
  }
}
export function setButtonLoading(button,isLoading,text,loadingText='procesando...'){
  if (!button) return

  button.disabled =isLoading
  button.innerHTML = isLoading?` 
    <span class="spinner-border spinner-border-sm me-2 " aria-hidden="true">
    </span>
    ${loadingText}
    `:text
}