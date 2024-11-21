const DadosLixo = require('../models/ApiModel');
exports.index = async(req, res) => {
  const { maior, ano, pib } = await DadosLixo.getMaiorValor();
  res.render('index', { maior, ano, pib });
  return;}
