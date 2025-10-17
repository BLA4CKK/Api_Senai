const cadastro = document.querySelector("#entrar");

cadastro.addEventListener("click", async () => {
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
  console.log(res);
  if (res.status == 200) {
    window.location.href = "../Inicial/Inicio.html";
  }
  alert("Usuário ou senha incorretos");
});
