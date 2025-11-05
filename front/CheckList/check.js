const salvar = document.getElementById('salvar')

// Quando clicar no botão "Histórico", abre o painel
const btnHistorico = document.querySelector('#icon img[alt="config"]').parentElement;
btnHistorico.addEventListener('click', () => {
  document.getElementById('painelHistorico').classList.add('ativo');
});

// Função pra fechar o painel
function fecharHistorico() {
  document.getElementById('painelHistorico').classList.remove('ativo');
}

const btnADClista = document.querySelector('.bot');
btnADClista.addEventListener("click", function () {
  const modal = document.querySelector('dialog.painel');
  modal.showModal();
});

// Função pra fechar o painel
function fecharAdicionarLista() {
  const modal = document.querySelector('dialog.painel');
  modal.close();
}

// const btnDeABAS = document.querySelector('.aba');
// btnDeABAS.addEventListener("click", function () {
//   const modal = document.querySelector('#caixa');
// });


const botoes = document.querySelectorAll('.ficha-ativo');

botoes.forEach(botao => {
  const cargo = localStorage.getItem('cargo')
  if(cargo == 'Professor')
  {
    if(botao.id == 'Direcao' || botao.id == 'Secretaria')
    {
      botao.style.display = 'none';
    }
  }
  else if(cargo == Inspetor){
    
  }
  botao.addEventListener('click', () => {
    abrirabas(botao);
  });
});

async function abrirabas(botaoClicado) {
  botoes.forEach(b => {
    b.style.background = ''; // volta pro padrão
  });
  botaoClicado.style.background = '#ffffffff';
  botaoClicado.id=='Secretaria' ? alert(botaoClicado.id):
  botaoClicado.id=='Direcao' ? alert(botaoClicado.id):
  botaoClicado.id=='Inspetor' ? alert(botaoClicado.id): null;
}

salvar.addEventListener('click', async ()=>{
  const funcao = document.querySelector('#funcao').value
  const data = document.querySelector('#data').value
  const responsavel = document.querySelector('#reposavel').value
  const localizacao = document.querySelector('#local').value
  const urgencia = document.querySelector('#nivel').value
  const id_usuario = localStorage.getItem("id_usuario")

  const res = await fetch("http://192.168.1.22:3000/checklist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      funcao,
      data,
      localizacao,
      urgencia,
      id_usuario
    })

})
})