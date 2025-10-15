document.addEventListener("DOMContentLoaded", ()=>{
    const pass = document.getElementById('senha')
    const mail = document.getElementById('email')
    const name = document.getElementById('nome')
    const buttonEntrar = document.getElementById('entrar')

    entrar.addEventListener('click', async ()=>{
      let senha = pass.value;
      let email = mail.value;
      let nome = name.value;
      
      await fetch('http://192.168.1.22:3000/cadastro', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            senha,
            email,
            nome,
        })
      })

    })
    
})