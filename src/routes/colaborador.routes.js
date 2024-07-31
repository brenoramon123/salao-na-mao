const express = require("express");
const routes = express.Router();
const Colaborador = require("../models/colaborador");
const mongoose = require("mongoose")
const pagarme = require("../services/pagarme");
routes.post("/", async(req,res)=>{
    const db = mongoose.connection;
       const session = await db.startSession();
    try {
        const {colaborador,salaoId} = req.body;
        const existentColaborador = await Colaborador.findOne({$or:[{email:colaborador.email},{telefone:colaborador.telefone}] })

        if(!existentColaborador){
            //CRIAR RECEBEDOR

            const { contaBancaria } = colaborador;
      const pagarmeBankAccount = await pagarme('/recipients', {
        bank_code: contaBancaria.banco,
        document_number: contaBancaria.cpfCnpj,
        agencia: contaBancaria.agencia,
        conta: contaBancaria.numero,
        conta_dv: contaBancaria.dv,
        legal_name: contaBancaria.titular,
      });

      if (pagarmeBankAccount.error) {
        throw pagarmeBankAccount;
      }

        }
       
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.json({error:true,message:error.message})
    }
})

module.exports = routes