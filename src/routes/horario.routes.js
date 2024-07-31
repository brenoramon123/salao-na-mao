const express = require("express");
const routes = express.Router();
const Horario = require("../models/horario")
routes.post("/", async(req,res)=>{
    try {
        const horario = await new Horario(req.body).save()
        res.json({horario})
    } catch (error) {
        res.json({error:true,message:error.message})
    }
})

module.exports = routes