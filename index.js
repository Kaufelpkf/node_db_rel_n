const express = require('express')
const app = express()
const cors = require('cors')

const conn = require('./db/conn')
const Fabricante = require('./model/Fabricante')
const Produto = require('./model/Produto')

const PORT = 3000
const hostname = 'localhost'

//-----------------------------------------------
app.use(express.urlencoded({exteded:true}))
app.use(express.json())
app.use(cors())
//-----------------------------------------------
app.get('/fabricante',async (req,res)=>{
    const valores = req.query
    console.log(valores)
   
    try{
        const pesq = await Fabricante.findOne({where: {marca: valores.marca}, raw:true})
        if(pesq === null){
            console.log('Dados não encontrados!')
            res.status(404).json({message:'Dados inexistentes!'})
        }else if(pesq.marca == valores.marca){
            console.log(pesq.marca)
            res.status(201).json(pesq)
        }

    }

    catch(err){
        console.error('Não foi possível consultar os dados!')
        res.status(500).json({message: 'Não foi possível consultar os dados!'})
    }
})


app.post('/fabricante', async (req,res)=>{
    const valores = req.body
    console.log(valores)
   try{
    const pesq = await Fabricante.create(valores, {raw: true})
    console.log(pesq)
    res.status(201).json(pesq)
}catch(err){
    console.error('Não foi possível gravar os dados!')
    res.status(500).json({message: 'Não foi possível gravar os dados!'})
}
})


app.get('/', (req,res)=>{
    console.log('Aplicação rodando!')
    res.status(200).json({message: 'Aplicação rodando'})
})

//-----------------------------------------------
conn.sync().then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`Servidor está rodando em ${hostname}:${PORT}!`)
    })
}).catch((err)=>{
    console.error('Banco de dados não conectado!',err)
})