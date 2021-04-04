const { response } = require('express');
const express = require('express');
const rout = express.Router();
const users = [{id:"asas",level:0, lastLevel:0}];
const levels = [{resp:"1983", link:"/pais.html"},{resp:"ahasverus", link:"/antes.html"},{resp:"pampa", link:"/jubilombios.html"} ];
rout.get('/api',(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*")
    if(req.query.id){
        const id = req.query.id;
        const user = users.find(e=>e.id==id);
        if(user){
            level=user.level;
            res.json({err:false, level:level, link:levels[level-1].link})
        }else{
            users.push({id:req.query.id,level:1});
            res.json({err:false,level:1})
        }
    }
    else{
        res.json({err:true, msg:"Nenhum id informado"})
    }
    console.log(users)
})
rout.get('/level',(req,res)=>{
    console.log(req.query)
    res.header("Access-Control-Allow-Origin","*")
    if(req.query.id){ //Verifica id
        if(req.query.level){ //Verifica nivel
            if(req.query.resp){ //verifica resposta
                const levelNum = parseInt(req.query.level)-1
                if(levels[levelNum]){ //Verifica existencia de nivel
                    if(req.query.resp==levels[levelNum].resp){
                        const user = users.find(e=> e.id==req.query.id);
                        if(user){
                            if(user.lastLevel!=req.query.level){
                            user.level++;
                            user.lastLevel=req.query.level
                            }
                            res.json({err:false, state:true, next:levels[parseInt(req.query.level)].link})
                        }else{
                            res.json({err:true, msg:"Nenhum usuário encontrado!"})
                        }
                    }else{
                        res.json({err:false, state:false})
                    }
                }
                else{
                    res.json({err:true, msg:"Nenhum level encontrado!"})
                }
            }else{
                res.json({err:true, msg:"Nenhuma resposta informada"})
            }
        }else{
            res.json({err:true, msg:"Nenhum level informado"})
        }
    }else{
        res.json({err:true, msg:"Nenhum id informado"})
    }
})

module.exports = rout;