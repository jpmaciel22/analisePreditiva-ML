const DadosLixo = require('../models/ApiModel');
exports.index = async(req, res) => {
  const { maior, ano, custo, pib } = await DadosLixo.getMaiorValor();
  res.render('index', { maior, ano, custo, pib });
  return;}
