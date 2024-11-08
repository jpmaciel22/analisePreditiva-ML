const DadosLixo = require('../models/ApiModel')

exports.index = async (req, res, next) => {
    res.render('api', { dadosLixo: DadosLixo });  // Passando a variável como "dadosLixo"
    return;
}