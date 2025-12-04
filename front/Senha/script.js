document.addEventListener("DOMContentLoaded", () => {
  const passAtual = document.getElementById("atual");
  const novaPass = document.getElementById("nova");
  const confirmPass = document.getElementById("confirma");
  const salvar = document.getElementById("bsave");
  const cancelar = document.getElementById("bcancel");
  const vazio = document.querySelector('.vazia')
  const sair = document.getElementById("sair")

  salvar.addEventListener("click", async () => {
    const senha = passAtual.value;
    const senha_N = novaPass.value;
    const confirma = confirmPass.value
    const id_usuario = localStorage.getItem("id_usuario")

    if(senha_N != confirma){
        alert('Senha incorreta no campo de confirmação')
        return

    }

    const res = await fetch("http://localhost:3000/mudarSenha", { // faz uma requisição para a URL fornecida
      method: "PUT", //atualizar 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        senha,
        senha_N,
        id_usuario
      }),
    });
    if(res.status==201){ 
        const div = document.createElement('div');
        div.innerText = 'Cadastro realizado';
        vazio.appendChild(div);
        window.location.href= '../Inicial/inicio.html'
    }
});

cancelar.addEventListener("click", async () => {
  window.location.href = '../Inicial/inicio.html'
})

sair.addEventListener("click", () => {
  localStorage.clear()
  window.location.href = '../Index/index.html'
})
});
