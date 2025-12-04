const entrar = document.querySelector("#entrar"); // seleciona o elemento com o id "entrar" e armazena na constante 'entrar'
const Cadastrar = document.querySelector("#cadastrar"); // seleciona o elemento com o id "cadastrar" e armazena na constante 'Cadastrar'
const change = document.querySelector("#toggleSenha"); // seleciona o elemento com o id "toggleSenha" e armazena na constante 'change'
entrar.addEventListener("click", async () => { // adiciona um evento de clique ao elemento 'entrar'
  const email = document.querySelector("#email").value; // seleciona o elemento com o id "email" e pega o valor digitado, armazenando na constante 'email'
  const senha = document.querySelector("#senha").value; // seleciona o elemento com o id "senha" e pega o valor digitado, armazenando na constante 'senha'
 
  const res = await fetch("http://localhost:3000/login", { // faz uma requisição para a URL fornecida 
    method: "POST", // define o método da requisição como POST
    headers: { "Content-Type": "application/json" }, // define o cabeçalho da requisição para indicar que o corpo é em formato JSON
    body: JSON.stringify({ // converte os dados para string JSON e os envia no corpo da requisição
      senha,
      email,
    }),
  });

  const capt = await res.json(); // espera a resposta da requisição e converte para JSON, armazenando na constante 'capt'
  if (res.status == 200) { // se o status da resposta for 200 (sucesso)
    localStorage.setItem("id_usuario", capt.id_usuario); // localStorage armazena o id do usuario, capt.id_usuario é o valor retornado na resposta da requisição
    localStorage.setItem("cargo", capt.cargo) // localStorage armazena o cargo do usuario, capt.cargo é o valor retornado na resposta da requisição
    return window.location.href = "../Inicial/Inicio.html"; // redireciona o usuário para a página "Inicio.html"
  }  return alert("Usuário ou senha incorretos"); // se o status não for 200, exibe um alerta informando que o usuário ou senha estão incorretos
});

Cadastrar.addEventListener("click", async () => { // adiciona um evento de clique ao elemento 'Cadastrar'
  window.location.href = "../Cadastro/cadastro.html" // redireciona o usuário para a página "cadastro.html"
})

change.addEventListener("click", async () => { // adiciona um evento de clique ao elemento 'change'
  const senha = document.querySelector("#senha") // seleciona o elemento com o id "senha" e armazena na constante 'senha'
  if(senha.getAttribute('type') == 'password'){ // se o atributo 'type' do elemento 'senha' for igual a 'password'
    senha.setAttribute('type', 'text') // altera o atributo 'type' do elemento 'senha' para 'text', tornando a senha visível
  } else{ // caso contrário
    senha.setAttribute('type','password') // altera o atributo 'type' do elemento 'senha' para 'password', ocultando a senha 
  }
  
})