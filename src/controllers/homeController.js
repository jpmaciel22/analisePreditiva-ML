const DadosLixo = require('../models/ApiModel');
exports.index = async(req, res) => {
  const { maior, ano, custo } = await DadosLixo.getMaiorValor();
  res.render('index', { maior, ano, custo });
  return;}
