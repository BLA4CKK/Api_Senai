const salvar = document.getElementById("salvar");
const id_usuario = localStorage.getItem("id_usuario");

// Quando clicar no botão "Histórico", abre o painel
const btnHistorico = document.querySelector(
  '#icon img[alt="config"]'
).parentElement;
btnHistorico.addEventListener("click", () => {
  document.getElementById("painelHistorico").classList.add("ativo");
});

// Função pra fechar o painel
function fecharHistorico() {
  document.getElementById("painelHistorico").classList.remove("ativo");
}

const btnADClista = document.querySelector(".bot");
btnADClista.addEventListener("click", function () {
  const modal = document.querySelector("dialog.painel");
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
  const cargo = localStorage.getItem("cargo");
  if (cargo == "Professor") {
    if (botao.id == "Direcao" || botao.id == "Secretaria") {
      botao.style.display = "none";
    }
  } else if (cargo == "Inspetor") {
    if (botao.id == "Direcao" || botao.id == "Secretaria") {
      botao.style.display = "none";
    }
  } else if (cargo == "Secretaria") {
    if (botao.id == "Direcao" || botao.id == "Professor") {
      botao.style.display = "none";
    } else {
      return;
    }
  }
  botao.addEventListener("click", () => {
    abrirabas(botao);
  });
});

function abrirabas(botaoClicado) {
  botoes.forEach((b) => {
    b.style.background = ""; // volta pro padrão
  });
  botaoClicado.style.background = "#ffffffff";
  botaoClicado.id == "Professor"
    ? renderAtiv(botaoClicado.id)
    : botaoClicado.id == "Secretaria"
    ? renderAtiv(botaoClicado.id)
    : botaoClicado.id == "Direcao"
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
  tarefas.innerHTML='';
  if (result.status != 200) {
    return (tarefas.innerText = "Nenhuma atividade registrada");
  }
  resultados.forEach((m) => {
    const caixa = document.createElement('div');
    caixa.classList='tarefas'
    caixa.innerHTML = `
      <p>${m.funcao}</p>
      <p>${m.data_requisicao}</p>
      <p>${m.nome}</p>
      <p>${m.localizacao}</p>
      <p>${m.prazo}</p>
    `;
    tarefas.appendChild(caixa);
  });
}

salvar.addEventListener("click", async () => {
  const funcao = document.querySelector("#funcao").value;
  const data = document.querySelector("#data").value;
  const responsavel = document.querySelector("#reposavel").value;
  const localizacao = document.querySelector("#local").value;
  const urgencia = document.querySelector("#nivel").value;
  const prazo = document.querySelector("#prazo").value;

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
    }),
  });
  fecharAdicionarLista();
});
