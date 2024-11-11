import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './assets/css/style.css';
import Chart from 'chart.js/auto';
const DadosLixo = require('../src/models/ApiModel')
const ctx = document.getElementById('myChart');
const ctx2 = document.getElementById('myChart2');

function atualizaGrafico(){
async function fetchData() { // pra pegar os dados da api do json
  const url = 'http://localhost:3000/views/dados_lixo.json'
  const response = await fetch(url);
  const datapoints = await response.json();
  return datapoints;
}

//datapoins salva os parametros de resposta da pagina em um objeto json, e apos isso nos passamos
// esta requisicao como parametro em datapoints e dentro do json chamado "dados_lixo" fazemos um map
//  para retornar especificamente os dados que queremos de dentro desse datapoints para salvar em uma variavel
// depois disso usamos as variaveis das charts e a partir dos seus objetos de configuracao mudamos seus valores. 
fetchData().then(datapoints => {
  const quantidade = datapoints.dados_lixo.map(function(index){
    return index.quantidade_gerada_kg;
  })
  const impacto = datapoints.dados_lixo.map(function(index){
    return index.impacto_ambiental;
  })
  chartzuda2.config.data.labels = impacto;
  chartzuda2.config.data.datasets[0].data = quantidade;
  chartzuda2.update();
})
}


const chartzuda2 = new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
    datasets: [{
      label: 'T de Lixo Gerado',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    borderColor: 'rgba(255,0,255,1)',
    fill: true,
  }
});

const chartzuda1 = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
    datasets: [{
      label: 'T de Lixo Gerado',
      data: [12, 19, 13, 5, 2, 3],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    borderColor: 'rgba(255,0,255,1)',
    fill: true,
  }
});

function rodarFetchAutomatico(){
  // const botao = document.querySelector('.fetchzudo');
  // if(botao){
  //   botao.addEventListener('click',function(e){
  //     atualizaGrafico();
  //   })
  // }else console.error('Nao encontrado.');
  atualizaGrafico();
}
document.addEventListener('DOMContentLoaded', rodarFetchAutomatico);