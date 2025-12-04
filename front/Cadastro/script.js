document.addEventListener("DOMContentLoaded", () => { // garante que o código dentro só será executado após o carregamento completo do DOM
  const pass = document.getElementById("senha");
  const mail = document.getElementById("email");
  const name = document.getElementById("nome");
  const buttonEntrar = document.getElementById("entrar");
  const senhaCriada = document.getElementById("senha_criada");
  const Cargo = document.querySelector  ("#selectCargo")
  const change = document.querySelector(".toggleSenha");


  buttonEntrar.addEventListener("click", async () => {
    let senha = pass.value;
    let email = mail.value;
    let nome = name.value;
    let criada = senhaCriada.value;
    let cargo = Cargo.value


    if (senha == '' || email =='' ||  criada== '' || nome == '' || cargo == '' ){
      alert('Nenhum campo deve permanecer vazio')
      return
    }
    if (senha.length < 8){
      alert("Senha deve conter ao menos 8 caracteres")
      return
    }
    if (senha !== criada){
      alert("Senhas não coincidem")
      return
    }

    const res = await fetch("http://localhost:3000/cadastro/novo", { // faz uma requisição para a URL fornecida
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        senha,
        email,
        nome,
        cargo
      }),
    });
    console.log(res);
    alert(res);
    if (res.status == 200) {
      document.location.href = "../Index/index.html";
    }

    pass.value = "";
    mail.value = "";
    name.value = "";
  });

  change.addEventListener("click", async () => {
  const senha = document.querySelector("#senha")
  if(senha.getAttribute('type') == 'password' || senhaCriada.getAttribute('type' == 'password')){
    senha.setAttribute('type', 'text')
    senhaCriada.setAttribute('type', 'text')
  } else{
    senha.setAttribute('type','password')
    senhaCriada.setAttribute('type','password')
  }
  
})
});