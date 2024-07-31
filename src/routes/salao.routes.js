const express = require("express");
const routes = express.Router();
const Salao = require("../models/salao")
const Servicos = require("../models/servico")
const turf = require("@turf/turf")
routes.post("/", async(req,res)=>{
    
    try {
        console.log(req.body)
        const salao = await new Salao(req.body).save();
        res.json({salao})

    } catch (error) {
        res.json({
            error:true,
            mesage:error.message
        })
    }
}
)

routes.get("/servicos/:salaoId",async(req,res)=>{
    try {
        const {salaoId}=req.params;
        const servicos = await Servicos.find({
            salaoId,
            status:"A"
        }).select("_id titulo") 

        res.json({
            servicos:servicos.map(s => ({label:s.titulo,value:s._id}))
        })

    } catch (error) {
        res.json({error:error.message})
    }
})

routes.get("/:id" ,async(req,res)=>{
    try {

        
        console.log(distance)

        const {id} = req.params
        const salao = await Salao.findById(id).select("capa nome endereco.cidade")

        var from = turf.point(salao.geo.coordinates);
        var to = turf.point([-23.531570, -46.789890]);
        const distance = turf.distance(from,to,{units:"kilometers"})
        res.json({error:false,salao})
        
    } catch (error) {
        res.json({error:true,message:error.message})
    }
})

module.exports = routes