const express = require('express');
const app = express();
const path = require('path');
const DadosLixo = require('../models/ApiModel')

exports.index = async (req, res, next) => {
    res.render('api', { dadosLixo: DadosLixo });  // Passando a variável como "dadosLixo"
    return;
}
exports.paginaDoJson = async (req,res,next) => {
    res.sendFile(path.join(__dirname,'..','views','dados_lixo.json'));
}