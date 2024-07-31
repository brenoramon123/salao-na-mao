const express = require('express');
const router = express.Router();
const Servico = require('../models/servico');
const Arquivos = require('../models/arquivo');
const upload = require('../services/multer'); // Assumindo que você salvou a configuração do multer em 'config/multer.js'
const aws = require("../services/aws");
// Rota POST para criar serviço e fazer upload de arquivos localmente
router.post('/', upload.array('files', 12), async (req, res) => {
    try {
        const { salaoId, servico } = req.body;
        let errors = [];
        let arquivos = [];

        // Processar os arquivos recebidos
        if (req.files && req.files.length > 0) {
            for (let file of req.files) {
                const path = `uploads/${file.filename}`;
                arquivos.push(path);
                const response = await aws.uploadToS3(
                    file,
                    path
                    //, acl = https://docs.aws.amazon.com/pt_br/AmazonS3/latest/dev/acl-overview.html
                  );
            }
        }

        if (errors.length > 0) {
            res.status(400).json(errors[0]);
            return;
        }

        // Criar serviço
        let jsonServico = JSON.parse(servico);
        jsonServico.salaoId = salaoId;
        const servicoCadastrado = await new Servico(jsonServico).save();

        // Criar registro dos arquivos no banco de dados
        const arquivosData = arquivos.map((arquivo) => ({
            referenciaId: servicoCadastrado._id,
            model: 'Servico',
            caminho: arquivo,
        }));
        await Arquivos.insertMany(arquivosData);

        res.json({ error: false, servico: servicoCadastrado, arquivos: arquivosData });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
});

// Rota PUT para atualizar serviço e fazer upload de arquivos localmente
router.put('/:id', upload.array('files', 12), async (req, res) => {
    try {
        const { salaoId, servico } = req.body;
        let errors = [];
        let arquivos = [];

        // Processar os arquivos recebidos
        if (req.files && req.files.length > 0) {
            for (let file of req.files) {
                const path = `uploads/${file.filename}`;
                arquivos.push(path);
                const response = await aws.uploadToS3(
                    file,
                    path
                  );
            }
        }

        if (errors.length > 0) {
            res.status(400).json(errors[0]);
            return;
        }

        let jsonServico = JSON.parse(servico);
        await Servico.findByIdAndUpdate(req.params.id, jsonServico);

        const arquivosData = arquivos.map((arquivo) => ({
            referenciaId: req.params.id,
            model: 'Servico',
            caminho: arquivo,
        }));
        await Arquivos.insertMany(arquivosData);

        res.json({ error: false, arquivos: arquivosData });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
});


router.get('/salao/:salaoId', async (req, res) => {
    try {
      let servicosSalao = [];
      const servicos = await Servico.find({
        salaoId: req.params.salaoId,
        status: { $ne: 'E' },
      });
  
      for (let servico of servicos) {
        const arquivos = await Arquivos.find({
          model: 'Servico',
          referenciaId: servico._id,
        });
        servicosSalao.push({ ...servico._doc, arquivos });
      }
  
      res.json({
        error: false,
        servicos: servicosSalao,
      });
    } catch (err) {
      res.json({ error: true, message: err.message });
    }
  });
  

  router.post('/remove-arquivo', async (req, res) => {
    try {
      const { arquivo } = req.body;
  
      await aws.deleteFileS3(arquivo);
  
      await Arquivos.findOneAndDelete({
        arquivo,
      });
  
      res.json({ error: false, message: 'Exito ao excluir o arquivo!' });
    } catch (err) {
      res.json({ error: true, message: err.message });
    }
  });
  

  router.delete('/:id', async (req, res) => {
    try {
      await Servico.findByIdAndUpdate(req.params.id, { status: 'E' });
      res.json({ error: false });
    } catch (err) {
      res.json({ error: true, message: err.message });
    }
  });
  

module.exports = router;
