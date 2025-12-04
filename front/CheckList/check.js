let salvar = document.getElementById("salvar");
const id_usuario = localStorage.getItem("id_usuario");
const desfazer = document.getElementById("desfazer");
const responsavel = document.getElementById("responsavel");
const apagar = document.getElementById("desfazer");

// Quando clicar no botão "Histórico", abre o painel
const btnHistorico = document.querySelector(
  '#icon img[alt="config"]' //pega o img dentro do id icon que tem alt config
).parentElement; //pega o elemento pai que é o botão
btnHistorico.addEventListener("click", () => { 
  const id_Historico = localStorage.getItem('id_usuario')
  const id_int = parseInt(id_Historico, 10)
  GerarHistorico(id_int)
  document.getElementById("painelHistorico").classList.add("ativo");

});

// Função pra fechar o painel
function fecharHistorico() { //função chamada no HTML
  document.getElementById("painelHistorico").classList.remove("ativo");
  
}

const btnADClista = document.querySelector(".bot"); //botão de adicionar lista
btnADClista.addEventListener("click", async () => {
  //adiciona o evento de clique
  const modal = document.querySelector("dialog.painel");

  responsavel.innerHTML = "";
  const result = await fetch("http://localhost:3000/ListarUsers");
  const resultados = await result.json();
  resultados.forEach((m) => {
    const option = document.createElement("option");
    option.innerText = m.nome;
    option.value = m.nome;

    responsavel.appendChild(option);
  });

  modal.showModal();
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
  botoes.forEach((b) => {
    b.style.background = "";
  });
  botaoClicado.style.background = "#ffffffff";
  botaoClicado.id == "Professor"
    ? renderAtiv(botaoClicado.id)
    : botaoClicado.id == "Secretaria"
    ? renderAtiv(botaoClicado.id)
    : botaoClicado.id == "Direção"
    ? renderAtiv(botaoClicado.id)
    : botaoClicado.id == "Inspetor"
    ? renderAtiv(botaoClicado.id)
    : null;
}
async function renderAtiv(setor) {
  console.log(setor);
  const result = await fetch(`http://localhost:3000/MostrarTarefa/${setor}`);
  const resultados = await result.json();
  const tarefas = document.querySelector("#tarefas");
  tarefas.innerHTML = "";
  if (resultados.length === 0) {
    return (tarefas.innerHTML =
      "<p>Nenhuma atividade registrada neste setor</p>");
  }
  !resultados.forEach((m) => {
    const date = new Date(m.data_requisicao);
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "UTC",
    };
    const dataFormatada = date.toLocaleDateString("pt-BR", options);

    const prazo = new Date(m.prazo);
    const prazoFormatado = prazo.toLocaleDateString("pt-BR", options);

    const caixa = document.createElement("div"); //cria uma div para a tarefa
    caixa.classList = "tarefas"; //define a classe da div como tarefas
    caixa.innerHTML = ` 
      <p id="funcao_${m.id_requisicao}">${m.funcao}</p>
      <p id="data_${m.id_requisicao}">${dataFormatada}</p>
      <p id="destinatario_${m.id_requisicao}">${m.destinatario_req}</p>
      <p id="localizacao_${m.id_requisicao}">${m.localizacao}</p>
      <p id="prazo_${m.id_requisicao}">${prazoFormatado}</p>
      <button onclick="deletar(${m.id_requisicao})">🗑</button>
      <button onclick="editar(${m.id_requisicao})">🖊</button>
    `; //adiciona o conteúdo da tarefa à div

    // Define a cor de fundo com base no nível de urgência

    if (m.nivel_urgencia == "Normal") {
      caixa.style.backgroundColor = "rgba(253, 253, 84, 0.59)";
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

  const res = await fetch("http://localhost:3000/checklist", {
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
  if(res.status == 200){
    alert("Criado")
    return location.reload()
  }
  fecharAdicionarLista();
});

async function deletar(id) {
  const res = await fetch(`http://localhost:3000/Apagar_req/${id}`, {
    method: "DELETE",
  });

  if (res.status == 200) {
    alert("Excluido");
   return location.reload()
    
  }
}

async function editar(id) {
  let new_botao = salvar.cloneNode(true);
  salvar.parentNode.replaceChild(new_botao, salvar);
  salvar = new_botao;

  const modal = document.querySelector("dialog.painel");
  modal.showModal();

  document.querySelector("#funcao").value = document.querySelector(
    `#funcao_${id}`
  ).innerText;
  const date = new Date(document.querySelector(`#data_${id}`).innerText);

  // IMPORTANTE ---------------------------------------------------------------------------------------
  // Qualquer data que venha de new Date() VAI vir no padrao mm/dd/yyyy, por isso no final na hora de
  // montar a string final esta invertido como: year-day-month
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const formattedDate = `${year}-${day}-${month}T00:00`;
  document.querySelector("#data").value = formattedDate;

  const prazo = new Date(document.querySelector(`#prazo_${id}`).innerText);
  const day_prazo = String(prazo.getDate()).padStart(2, "0");
  const month_prazo = String(prazo.getMonth() + 1).padStart(2, "0");
  const year_prazo = prazo.getFullYear();
  const formattedDate_prazo = `${year_prazo}-${day_prazo}-${month_prazo}T00:00`;
  document.querySelector("#prazo").value = formattedDate_prazo;

  const result = await fetch("http://localhost:3000/ListarUsers");
  const resultados = await result.json();
  const pessoa_responsavel = document.querySelector(`#destinatario_${id}`);
  resultados.forEach((m) => {
    const option = document.createElement("option");
    option.innerText = m.nome;
    option.value = m.nome;
    if (pessoa_responsavel.innerText == option.value) {
      console.log(option.value);
      option.selected = true;
    }
    responsavel.appendChild(option);
  });

  

  
  // document.querySelector("#nivel").value = document.querySelector(`#data_${id}`);
  // document.querySelector("#local").value = document.querySelector(`#localizacao_${id}`).innerText;

  salvar.addEventListener("click", async () => {
    const funcao = document.querySelector("#funcao").value;
    const data = document.querySelector("#data").value;
    const responsavel = document.querySelector("#responsavel").value;
    const localizacao = document.querySelector("#local").value;
    const urgencia = document.querySelector("#nivel").value;
    const prazo = document.querySelector("#prazo").value;
    const res = await fetch(`http://localhost:3000/Editar_Req/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        funcao,
        data,
        localizacao,
        urgencia,
        prazo,
        responsavel
      }),
    });
    if(res.status == 200){
      alert("Editado")
      return location.reload()
    }
    fecharAdicionarLista();
    
  });
}


//Inicio da area de historico. Inicio dia 04/12/2025

async function GerarHistorico(id) {
  const historico = document.getElementById("painelHistorico")
  const Busca = await fetch(`http://localhost:3000/Historico/${id}`);
  const resultadosBusca = await Busca.json();

resultadosBusca.forEach((m)=>{
  const div = document.createElement('div')
  div.innerHTML = ` 
      <p>Requisição feita dia ${m.data_requisicao}</P>
    `;
  historico.appendChild(div)
})
}
