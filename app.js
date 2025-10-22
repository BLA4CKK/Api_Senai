import express from 'express'
import cors from 'cors'
import sql from './database.js'

const app = express()
app.use(express.json())
app.use(cors())

// Rota para cadastro de novo usuario. Ele entra como professor, cargo mais baixo.
app.post("/cadastro/novo", async (req, res)=>{
  const {senha, nome, email } = req.body;
  console.log('cadastrado')
  const cadastro = await sql `INSERT INTO USUARIO(email, nome, cargo, senha ) values(${email}, ${nome},'Professor', ${senha} )`
  return res.status(200).json(cadastro[0])
})

// Rota validação de Login. 
app.post("/login/", async (req, res)=>{
 const {email, senha} = req.body;
 const entrar = await sql `select * from usuario where email = ${email}`
 if(entrar[0]){
    const verificar = await sql `select * from usuario where email =${email} and senha= ${senha}`
    if(verificar[0]){
      console.log('to aqui')
      return res.status(200).json(verificar[0])
    }
    return res.status(401).json({message: 'Usuário ou senha incorreto'})
 }  
 else{
  return res.status(404).json('Usuário não encontrado')
 }
})

app.put("/mudarSenha", async (req, res)=>{
  const {senha} = req.body

})

app.listen(3000, () => {
  console.log("Cu")
})

