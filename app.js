import express from 'express'
import cors from 'cors'
import sql from './database.js'

const app = express()
app.use(express.json())
app.use(cors())

app.post("/cadastro", async (req, res)=>{
  const {senha, nome, email } = req.body;
  console.log('To aqui')
  const cadastro = await sql `INSERT INTO USUARIO(email, nome, senha) values(${email}, ${nome}, ${senha})`
  return res.status(200).json({message: 'Cadastro realizado'})
})
app.listen(3000, () => {
  console.log("Cu")
})

