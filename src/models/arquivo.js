const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const arquivo = new Schema({
  caminho: {
    type: String,
    required: true,
  },
  dataCadastro:{
    type:Date,
    default:Date.now
  },
  referenciaId:{
    type:Schema.Types.ObjectId,
    refPath:"model"

  },
  model:{
    type:String,
    required:true,
    enum:["Servico","Salao"]
  }
});

module.exports = mongoose.model('Arquivo', arquivo);