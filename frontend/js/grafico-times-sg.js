fetch('http://localhost:3000/times/por-gols')
    .then(response => response.json())
    .then(dadosDosTimes => {

        const nomesDosTimes = dadosDosTimes.map(time => time.time);
        const sgDosTimes = dadosDosTimes.map(time => time.sg);

        const contexto = document.getElementById('grafico4times').getContext('2d');

        const config = {
            type: 'bar',
            data: {
                labels: nomesDosTimes,
                datasets: [{
                    label: 'Quantidade de gols do time',
                    data: sgDosTimes,

                    // Cor das barras
                    backgroundColor: 'rgba(255, 59, 59, 0.75)',

                    // Borda das barras
                    borderColor: '#ff3b3b',
                    borderWidth: 2,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: '#ffffff',
                            padding: 16,
                            font: { size: 14 }
                        }
                    },
                    title: {
                        display: false,
                        text: 'Gols'
                    }
                },
                scales: {
                    x: {
                        ticks: { color: '#ffffff', font: { size: 13 } },
                        grid: { color: 'rgba(255,255,255,0.08)' }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: { color: '#ffffff', font: { size: 13 } },
                        grid: { color: 'rgba(255,255,255,0.15)' }
                    }
                }
            }
        };

        new Chart(contexto, config);
    })
    .catch(erro => console.error("Erro ao alimentar o gráfico:", erro));