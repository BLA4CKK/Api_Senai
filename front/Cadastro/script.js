document.addEventListener("DOMContentLoaded", () => {
  const pass = document.getElementById("senha");
  const mail = document.getElementById("email");
  const name = document.getElementById("nome");
  const buttonEntrar = document.getElementById("entrar");
  const senhaCriada = document.getElementById("senha_criada");

  buttonEntrar.addEventListener("click", async () => {
    let senha = pass.value;
    let email = mail.value;
    let nome = name.value;
    let criada = senhaCriada.value;

    if (senha == '' || email =='' ||  criada== '' || nome == '' ){
      alert('Nenhum campo deve permanecer vazio')
      return
    }
    if (senha.length < 8){
      alert("Senha deve conter ao menos 8 caracteres")
      return
    }

    const res = await fetch("http://192.168.1.22:3000/cadastro/novo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        senha,
        email,
        nome,
      }),
    });
    console.log(res);
    alert(res);
    if (res.status == 200) {
      document.location.href = "../Index/Login.html";
    }

    pass.value = "";
    mail.value = "";
    name.value = "";
  });
});
