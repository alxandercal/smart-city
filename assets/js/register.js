document.getElementById('registerForm')?.addEventListener('submit',(e)=>{
    e.preventDefault()
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const confirmpassword = document.getElementById('confirmpassword').value
    if(!name||!email||!password||!confirmpassword){
        showAlert('registerAlert','Todos los datos son obligatorios')
        return
    }
    if(password !== confirmpassword){
        showAlert('registerAlert','Las contraseñas no son iguales.')
        return
    }
    //simulacion de registros en local storage
    localStorage.setItem('userName',name)
    showAlert('register','El registro fue satisfactorio')
    window.location.href='login.html'
})
