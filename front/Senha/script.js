document.addEventListener("DOMContentLoaded", () => {
  const passAtual = document.getElementById("atual");
  const novaPass = document.getElementById("nova");
  const confirmPass = document.getElementById("confirma");
  const salvar = document.getElementById("bsave");
  const cancelar = document.getElementById("bcancel");
  const vazio = document.querySelector('.vazia')

  salvar.addEventListener("click", async () => {
    const senha = passAtual.value;
    const senha_N = novaPass.value;
    const id_usuario = localStorage.getItem("id_usuario")

    if(senha_N != senha ){
        alert('Senha incorreta no campo de confirmação')
        return

    }

    const res = await fetch("http://192.168.1.22:3000/mudarSenha", {
      method: "PUT",
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

});
