import { observerAuth,logoutUser,getUserCurrentProfile } from "./auth.js"

const userName=document.getElementById('userName')
const navUserName=document.getElementById('userName')

const userEmail=document.getElementById('userEmail')
const favoriteCity=document.getElementById('favoriteCity')
const logoutBtn=document.getElementById('logoutBtn')


observerAuth(async(user)=>{
    if(!user){
        window.location.href ='./../../login.html'
        return
    }
    const profile=await getUserCurrentProfile(user.uid)

    const resolveName= profile?.name || 'usuario'
    const resolveEmail= profile?.email || '--'
    const resolveCity = profile?.city || 'no added'

    userName.textContent=resolveName
    navUserName.textContent=resolveName
    userEmail.textContent=resolveEmail
    favoriteCity.textContent=resolveCity
})


logoutBtn?.addEventListener('click',async()=>{
    await logoutUser()
    window.location.href ='./../../login.html'
})
