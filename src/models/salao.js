const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definir o schema para o modelo Salao
const salaoSchema = new Schema({
  nome: { type: String, required: true },
  foto: { type: String },
  capa: { type: String },
  email: { type: String, required: true },
  senha: { type: String, required: true },
  telefone: { type: String },
  recipientId: { type: String },
  endereco: {
    cidade: { type: String, required: true },
    uf: { type: String, required: true },
    cep: { type: String, required: true },
    logradouro: { type: String, required: true },
    numero: { type: String, required: true },
    pais: { type: String, required: true }
  },
  geo: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], required: true }
  },
  dataCadastro: { type: Date, default: Date.now }
});

// Criar um índice geoespacial
salaoSchema.index({ geo: '2dsphere' });

// Criar o modelo
const Salao = mongoose.model('Salao', salaoSchema);

module.exports = Salao;
