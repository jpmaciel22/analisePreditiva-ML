import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './assets/css/style.css';
import Chart from 'chart.js/auto';
const ctx = document.getElementById('myChart');
  
    new Chart(ctx, {
      type: 'line',
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