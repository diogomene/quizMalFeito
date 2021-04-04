const express = require('express');
const app = express();

const cors=require('cors');
app.use(express.json())
const {PORT=3000}=process.env

app.use(require('./router'))
app.use(cors());

app.listen(PORT,()=>{console.log(`Rodando na porta ${PORT}`)})