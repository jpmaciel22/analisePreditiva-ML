const mongoose = require('mongoose');

// const ApiSchema = new mongoose.Schema({
//     json: { type: String, required: true },
//   });
//   const ApiModel = mongoose.model('Api', ApiSchema);

const fs = require('fs');
const path = require('path');

exports.getMaiorValor = async () => {
  const filePath = path.join(__dirname, '../views/dados_lixo.json');
  const rawData = fs.readFileSync(filePath);
  const jsonData = JSON.parse(rawData);

   // Encontrar o maior valor e o respectivo ano
   const maiorRegistro = jsonData.dados_lixo.reduce((anterior, maior) => {
    return maior.toneladas > anterior.toneladas ? maior : anterior;
  });

  const maior = maiorRegistro.toneladas;
  const ano = maiorRegistro.ano;
  const pib = maiorRegistro.pib;
  const custo = maiorRegistro.custo;

  // Retornar ambos os valores
  return { maior, ano, custo, pib };
};