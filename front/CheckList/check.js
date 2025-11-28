const salvar = document.getElementById("salvar");
const id_usuario = localStorage.getItem("id_usuario");
const desfazer = document.getElementById("desfazer");
const responsavel = document.getElementById("responsavel");
const apagar = document.getElementById("desfazer");

// // Quando clicar no botão "Histórico", abre o painel
// const btnHistorico = document.querySelector(
//   '#icon img[alt="config"]' //pega o img dentro do id icon que tem alt config
// ).parentElement; //pega o elemento pai que é o botão
// btnHistorico.addEventListener("click", () => { //adiciona o evento de clique
//   document.getElementById("painelHistorico").classList.add("ativo"); //adiciona a classe ativo ao painel
// });

// // Função pra fechar o painel
// function fecharHistorico() { //função chamada no HTML
//   document.getElementById("painelHistorico").classList.remove("ativo"); //remove a classe ativo do painel
// }

const btnADClista = document.querySelector(".bot"); //botão de adicionar lista
btnADClista.addEventListener("click", async () => {
  //adiciona o evento de clique
  const modal = document.querySelector("dialog.painel"); //pega o dialog com a classe painel

  responsavel.innerHTML = ""; //limpa as opções anteriores
  const result = await fetch("http://192.168.1.22:3000/ListarUsers"); //busca os usuários
  const resultados = await result.json(); // converte a resposta para json
  resultados.forEach((m) => {
    // resultados é um array, então percorre cada usuário
    const option = document.createElement("option"); //cria um elemento option
    option.innerText = m.nome; //define o texto do option como o nome do usuário
    option.value = m.nome; //define o valor do option como o nome do usuário

    responsavel.appendChild(option); //adiciona o option ao select de responsavel
  });

  modal.showModal(); //mostra o modal
});

// Função pra fechar o painel
function fecharAdicionarLista() {
  const modal = document.querySelector("dialog.painel");
  modal.close();
}

// const btnDeABAS = document.querySelector('.aba');
// btnDeABAS.addEventListener("click", function () {
//   const modal = document.querySelector('#caixa');
// });

const botoes = document.querySelectorAll(".ficha-ativo");

botoes.forEach((botao) => {
  const cargo = localStorage.getItem("cargo"); //pega o cargo do usuário do localStorage
  if (cargo == "Professor") {
    //se o cargo for Professor
    if (botao.id == "Direção" || botao.id == "Secretaria") {
      //se o botão for Direção ou Secretaria
      botao.style.display = "none"; //esconde o botão
      desfazer.style.display = "none"; //esconde o botão desfazer
    }
  } else if (cargo == "Inspetor") {
    if (botao.id == "Direção" || botao.id == "Secretaria") {
      botao.style.display = "none";
      desfazer.style.display = "none";
    }
  } else if (cargo == "Secretaria") {
    if (botao.id == "Direção" || botao.id == "Professor") {
      botao.style.display = "none";
      desfazer.style.display = "none";
    }
  } else {
    console.log("Olá diretora");
  }
  botao.addEventListener("click", () => {
    abrirabas(botao); //chama a função para abrir a aba
  });
});

function abrirabas(botaoClicado) {
  //função para abrir a aba
  botoes.forEach((b) => {
    //para cada botão
    b.style.background = ""; // volta pro padrão
  });
  botaoClicado.style.background = "#ffffffff"; //muda a cor do botão clicado
  botaoClicado.id == "Professor"
    ? renderAtiv(botaoClicado.id) //chama a função para renderizar as atividades
    : botaoClicado.id == "Secretaria" //
    ? renderAtiv(botaoClicado.id)
    : botaoClicado.id == "Direção"
    ? renderAtiv(botaoClicado.id)
    : botaoClicado.id == "Inspetor"
    ? renderAtiv(botaoClicado.id)
    : null;
}
async function renderAtiv(setor) {
  console.log(setor);
  const result = await fetch(`http://192.168.1.22:3000/MostrarTarefa/${setor}`);
  const resultados = await result.json();
  const tarefas = document.querySelector("#tarefas");
  tarefas.innerHTML = "";
  if (resultados.length === 0) {
    return (tarefas.innerHTML =
      "<p>Nenhuma atividade registrada neste setor</p>");
  }
  !resultados.forEach((m) => {
    //para cada tarefa

    const date = new Date(m.data_requisicao); //data da requisição
    const options = {
      //opções de formatação da data
      day: "2-digit", //formato dia com dois dígitos
      month: "2-digit", //formato mês com dois dígitos
      year: "numeric", //formato ano com quatro dígitos
      timeZone: "UTC", //define o fuso horário como UTC
    };
    const dataFormatada = date.toLocaleDateString("pt-BR", options); //formata a data para o padrão brasileiro

    const prazo = new Date(m.prazo); //data do prazo
    const prazoFormatado = prazo.toLocaleDateString("pt-BR", options); //formata a data do prazo para o padrão brasileiro

    const caixa = document.createElement("div"); //cria uma div para a tarefa
    caixa.classList = "tarefas"; //define a classe da div como tarefas
    caixa.innerHTML = ` 
      <p>${m.funcao}</p>
      <p>${dataFormatada}</p>
      <p>${m.destinatario_req}</p>
      <p>${m.localizacao}</p>
      <p>${prazoFormatado}</p>
      <button onclick="deletar(${m.id_requisicao})">🗑</button>
    `; //adiciona o conteúdo da tarefa à div

    // Define a cor de fundo com base no nível de urgência

    if (m.nivel_urgencia == "Normal") {
      caixa.style.  backgroundColor = "rgba(253, 253, 84, 0.59)";
    }
    if (m.nivel_urgencia == "Não Urgente") {
      caixa.style.backgroundColor = "rgba(58, 253, 87, 0.59)";
    }
    if (m.nivel_urgencia == "Urgente") {
      caixa.style.backgroundColor = "rgba(255, 71, 71, 0.59)";
    }

    tarefas.appendChild(caixa); //adiciona a div à seção de tarefas
  });
}

salvar.addEventListener("click", async () => {
  const funcao = document.querySelector("#funcao").value;
  const data = document.querySelector("#data").value;
  const responsavel = document.querySelector("#responsavel").value;
  const localizacao = document.querySelector("#local").value;
  const urgencia = document.querySelector("#nivel").value;
  const prazo = document.querySelector("#prazo").value;

  if (
    prazo == "" ||
    data == "" ||
    responsavel == "" ||
    localizacao == "" ||
    urgencia == "" ||
    prazo == ""
  ) {
    alert("Nenhum campo deve estar vazio");
    return;
  }

  const res = await fetch("http://192.168.1.22:3000/checklist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      funcao,
      data,
      localizacao,
      urgencia,
      id_usuario,
      prazo,
      responsavel,
    }),
  });
  fecharAdicionarLista();
});

async function deletar(id) {
  const res = await fetch(`http://192.168.1.22:3000/Apagar_req/${id}`, {
    method: "DELETE",
  });
  
  if(res.status == 200){
    alert("Excluido")
    window.location.reload
  }
  
}
