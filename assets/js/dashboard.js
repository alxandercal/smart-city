

document.addEventListener('DOMContentLoaded',()=>{
    const userName=localStorage.getItem('userName')||'usuario'
    document.getElementById('userName').textContent=userName

    documen.getElementById('logoutBtn')?.addEventListener('click',()=>{
        localStorage    .removeItem('userName')
        window.location.href ='login.html'   })
})
