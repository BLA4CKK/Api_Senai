import express from "express";  // Importa o framework Express para criar o servidor web
import cors from "cors"; // Importa o middleware CORS para permitir requisições de diferentes origens
import sql from "./database.js"; // Importa a configuração do banco de dados

// nesse codigo estamos importando as bibliotecas necessarias para criar um servidor web com express, permitir requisições de diferentes origens com cors e conectar ao banco de dados com sql.

const app = express();  // cria uma constante 'app' que representa a aplicação Express
app.use(express.json()); // pega a constante 'app' e configura para usar o middleware que permite o parsing de JSON no corpo das requisições
app.use(cors()); // configura a aplicação para usar o middleware CORS

//nesse trecho estamos criando a aplicação express e configurando ela para entender requisições com corpo em JSON e permitir requisições de diferentes origens.

// Rota para cadastro de novo usuario.
app.post("/cadastro/novo", async (req, res) => { // define uma rota POST para a URL "/cadastro/novo"
  const { senha, nome, email, cargo } = req.body; // pega os dados do corpo da requisição (senha, nome, email, cargo)
  console.log("cadastrado"); //mostra no console a mensagem "cadastrado"
  const cadastro = // cria uma constante 'cadastro' que armazena o resultado da consulta SQL
    await sql`INSERT INTO USUARIO(email, nome, cargo, senha ) values(${email}, ${nome}, ${cargo}, ${senha} )`; // armazena no banco de dados os dados do novo usuário
  return res.status(200).json(cadastro[0]); //retorna uma resposta de sucesso com os dados do usuário em formato JSON
});

// nesse trecho estamos definindo uma rota para cadastrar um novo usuario no banco de dados, pegando os dados do corpo da requisição e armazenando no banco, retornando uma resposta de sucesso.

// Rota validação de Login.
app.post("/login/", async (req, res) => { // define uma rota POST para a URL "/login/"
  const { email, senha } = req.body; // pega os dados do corpo da requisição (email e senha)
  const entrar = await sql`select * from usuario where email = ${email}`; // cria uma constante 'entrar' que armazena o resultado da consulta SQL para verificar se o email existe no banco de dados
  if (entrar[0]) { // se for verdadeiro (ou seja, o email existe)
    const verificar = //  cria uma constante 'verificar' que armazena o resultado da consulta SQL para verificar se o email e senha correspondem
      await sql`select * from usuario where email =${email} and senha= ${senha}`; // consulta o banco de dados para verificar se o email e senha correspondem
    if (verificar[0]) { // se verificar for verdadeiro
      return res.status(200).json(verificar[0]); //retorna uma resposta de sucesso com os dados do usuário em formato JSON
    }
    return res.status(401).json({ message: "Usuário ou senha incorreto" }); // se for falso, retona uma mensagem de erro
  } else { // se não for verdadeiro (ou seja, o email não existe)
    return res.status(404).json("Usuário não encontrado"); // retorna outra mensagem de erro
  }
});

// nesse trecho estamos definindo uma rota para validar o login do usuario, verificando se o email existe no banco de dados e se a senha corresponde, retornando uma resposta de sucesso ou mensagens de erro conforme o caso.

app.put("/mudarSenha", async (req, res) => { // define uma rota PUT para a URL "/mudarSenha"
  const { senha, senha_N, id_usuario } = req.body; // pega os dados do corpo da requisição (senha atual, nova senha e id do usuario)

  const trocar = await sql`SELECT senha FROM usuario where id_usuario = ${id_usuario} and senha = ${senha}`; // cria uma constante 'trocar' que armazena o resultado da consulta SQL para verificar se a senha atual corresponde ao id do usuario

  if (trocar.length != 0) { // se for verdadeiro (ou seja, a senha atual corresponde)
    await sql`UPDATE usuario SET senha = ${senha_N} WHERE id_usuario = ${id_usuario};`; // atualiza a senha do usuario no banco de dados para a nova senha
    return res.status(201).json({message : "teste"}); //retorna uma resposta de sucesso
  }
  return res.status(401).json({ message: "bla" }); // se for falso, retona uma mensagem de erro
})

// nesse trecho estamos definindo uma rota para mudar a senha do usuario, verificando se a senha atual corresponde ao id do usuario, atualizando a senha no banco de dados e retornando uma resposta de sucesso ou mensagem de erro conforme o caso.

app.post("/checklist", async (req, res) => { // define uma rota POST para a URL "/checklist"
  const { funcao, data, localizacao, urgencia, id_usuario, prazo, responsavel} = req.body // pega os dados do corpo da requisição (funcao, data, localizacao, urgencia, id_usuario, prazo, responsavel)

  const criar = await sql `INSERT INTO requisicao(nivel_urgencia, funcao, data_requisicao, localizacao, id_usuario, prazo, destinatario_req) VALUES(${urgencia}, ${funcao}, ${data}, ${localizacao}, ${id_usuario}, ${prazo}, ${responsavel})`; // cria uma constante 'criar' que armazena o resultado da consulta SQL para inserir uma nova requisição no banco de dados
  return res.status(200).json(criar[0]) //retorna uma resposta de sucesso 
})

// nesse trecho estamos definindo uma rota para criar uma nova requisição no banco de dados, pegando os dados do corpo da requisição e inserindo no banco, retornando uma resposta de sucesso.

app.get("/MostrarTarefa/:cargo", async (req, res) => { // define uma rota GET para a URL "/MostrarTarefa/:cargo"
  const {cargo} = req.params // cria uma constante 'cargo' que pega o parâmetro da URL
  const mostrar = await sql `SELECT * FROM requisicao 
where requisicao.localizacao = ${cargo}` // cria uma constante 'mostrar' que armazena o resultado da consulta SQL para selecionar todas as requisições com a localização igual ao cargo
 return res.status(200).json(mostrar) //retorna uma resposta de sucesso com os dados das requisições em formato JSON
})

// nesse trecho estamos definindo uma rota para mostrar as tarefas de acordo com o cargo, pegando o parâmetro da URL e selecionando as requisições no banco de dados, retornando uma resposta de sucesso com os dados.

app.get("/ListarUsers", async (req, res) => {  // define uma rota GET para a URL "/ListarUsers"
  const listar = await sql `SELECT id_usuario, nome FROM usuario;` // cria uma constante 'listar' que armazena o resultado da consulta SQL para selecionar o id e nome de todos os usuarios no banco de dados
  return res.status(200).json(listar) //retorna uma resposta de sucesso com os dados dos usuarios em formato JSON

})

app.delete("/Apagar_Req/:id", async(req, res)=>{
  const {id}= req.params
  const apagar = await sql `DELETE FROM requisicao
WHERE id_requisicao = ${id};
`
return res.status(200).json(apagar)
})

app.listen(3000, () => { // inicia o servidor na porta 3000
  console.log("Cu");
});
