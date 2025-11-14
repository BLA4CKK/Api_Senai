import express from "express";
import cors from "cors";
import sql from "./database.js";

const app = express();
app.use(express.json());
app.use(cors());

// Rota para cadastro de novo usuario.
app.post("/cadastro/novo", async (req, res) => {
  const { senha, nome, email,cargo } = req.body;
  console.log("cadastrado");
  const cadastro =
    await sql`INSERT INTO USUARIO(email, nome, cargo, senha ) values(${email}, ${nome}, ${cargo}, ${senha} )`;
  return res.status(200).json(cadastro[0]);
});

// Rota validação de Login.
app.post("/login/", async (req, res) => {
  const { email, senha } = req.body;
  const entrar = await sql`select * from usuario where email = ${email}`;
  if (entrar[0]) {
    const verificar =
      await sql`select * from usuario where email =${email} and senha= ${senha}`;
    if (verificar[0]) {
      return res.status(200).json(verificar[0]);
    }
    return res.status(401).json({ message: "Usuário ou senha incorreto" });
  } else {
    return res.status(404).json("Usuário não encontrado");
  }
});

app.put("/mudarSenha", async (req, res) => {
  const { senha, senha_N, id_usuario } = req.body;

  const trocar = await sql`SELECT senha FROM usuario where id_usuario = ${id_usuario} and senha = ${senha}`;

  if (trocar.length != 0) {
    await sql`UPDATE usuario SET senha = ${senha_N} WHERE id_usuario = ${id_usuario};`;
    return res.status(201).json({message : "teste"});
  }
  return res.status(401).json({ message: "bla" });
});

app.post("/checklist", async (req, res) => {
  const { funcao, data, localizacao, urgencia, id_usuario, prazo} = req.body

  const criar = await sql `INSERT INTO requisicao(nivel_urgencia, funcao, data_requisicao, localizacao, id_usuario, prazo) VALUES(${urgencia}, ${funcao}, ${data}, ${localizacao}, ${id_usuario}, ${prazo})`;
  return res.status(200).json(criar[0])
})

app.get("/MostrarTarefa/:cargo", async (req, res) => {
  const {cargo} = req.params
  const mostrar = await sql `SELECT 
  *
FROM requisicao
JOIN usuario 
ON requisicao.localizacao = usuario.cargo
where usuario.cargo = ${cargo}`
 return res.status(200).json(mostrar)
})

app.listen(3000, () => {
  console.log("Cu");
});
