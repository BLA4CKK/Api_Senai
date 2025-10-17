import express from 'express'
import cors from 'cors'
import sql from './database.js'

const app = express()
app.use(express.json())
app.use(cors())

app.post("/cadastro/novo", async (req, res)=>{
  const {senha, nome, email } = req.body;
  console.log('cadastrado')
  const cadastro = await sql `INSERT INTO USUARIO(email, nome, cargo, senha ) values(${email}, ${nome},'Professor', ${senha} )`
  return res.status(200).json(cadastro[0])
})

app.post("/login/", async (req, res)=>{
 const {email, senha} = req.body;
 const entrar = await sql `select * from usuario where email = ${email}`
 console.log(entrar)
 if(entrar.length != 0){
    const verificar = await sql `select * from usuario where senha= ${senha}`
     console.log(verificar)
    if(verificar.length != 0){
      return res.status(200).json(verificar[0])
    }
    return res.json({message: 'Usuário ou senha incorreto'})
 }  
 else{
  return res.status(404).json('Usuário não encontrado')
 }
})

app.listen(3000, () => {
  console.log("Cu")
})

