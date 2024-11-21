import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './assets/css/style.css';
import Chart from 'chart.js/auto';
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
    return index.toneladas;
  })
  const ano = datapoints.dados_lixo.map(function(index){
    return index.ano;
  })
  const populacao = datapoints.dados_lixo.map(function(index){
    return index.populacao;
  })
  const pib = datapoints.dados_lixo.map(function(index){
    return index.pib;
  })
  const turistas = datapoints.dados_lixo.map(function(index){
    return index.turistas;
  })
  chartzuda2.config.data.labels = ano;
  chartzuda2.config.data.datasets[0].data = quantidade;
  chartzuda1.config.data.labels = turistas;
  chartzuda1.config.data.datasets[0].data = pib;
  chartzuda2.update();
  chartzuda1.update();

  for(i in quantidade){
    maior = 0;
    if(i>maior) maior = i;
  }
  return maior;
})
}



const chartzuda2 = new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
    datasets: [{
      label: 'T de Lixo Gerado',
      data: [12, 19, 3, 5, 2, 3],
    }]
  },
  options: {
    scales: {
      y: {
        min: 100000,
        title:{
          display:true,
          text: 'Toneladas',
        },
        beginAtZero: false
      },
      x:{ title: {
        display: true,
        text: 'Ano'
      }

      }
    },
    borderColor: 'rgba(130,46,255,1)',
    borderWidth: 2,
    fill: true,
  }
});

const chartzuda1 = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
    datasets: [{
      label: 'PIB',
      data: [12, 19, 13, 5, 2, 3],
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        title:{
          display:true,
          text: 'PIB'},
      },
      x:{ 
        title: {
        display: true,
        text: 'Turistas ( Em milhões )'
      }
    },
  },
    borderColor: 'rgba(130,46,255,1)',
    fill: true,
    borderWidth: 1.3
}});

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