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
  botao.addEventListener('click', () => {
    abrirabas(botao);
  });
});

function abrirabas(botaoClicado) {
  botoes.forEach(b => {
    b.style.background = ''; // volta pro padrão
  });
  botaoClicado.style.background = '#ffffffff';
  botaoClicado.id =='Professor' ? alert(botaoClicado.id): //DUDA AQUI VC COLOCA A ROTA PARA PUXAR OS DADOS DE CADA ABA
  botaoClicado.id=='Secretaria' ? alert(botaoClicado.id):
  botaoClicado.id=='Direcao' ? alert(botaoClicado.id):
  botaoClicado.id=='Inspetor' ? alert(botaoClicado.id): null;
}