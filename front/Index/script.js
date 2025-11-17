const entrar = document.querySelector("#entrar");
const Cadastrar = document.querySelector("#cadastrar");
const change = document.querySelector("#toggleSenha");
entrar.addEventListener("click", async () => {
  const email = document.querySelector("#email").value;
  const senha = document.querySelector("#senha").value;

  const res = await fetch("http://192.168.1.22:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      senha,
      email,
    }),
  });

  const capt = await res.json();
  if (res.status == 200) {
    localStorage.setItem("id_usuario", capt.id_usuario);
    localStorage.setItem("cargo", capt.cargo)
    return window.location.href = "../Inicial/Inicio.html";
  }  return alert("Usuário ou senha incorretos");
});

Cadastrar.addEventListener("click", async () => {
  window.location.href = "../Cadastro/cadastro.html"
})

change.addEventListener("click", async () => {
  const senha = document.querySelector("#senha")
  if(senha.getAttribute('type') == 'password'){
    senha.setAttribute('type', 'text')
  } else{
    senha.setAttribute('type','password')
  }
  
})