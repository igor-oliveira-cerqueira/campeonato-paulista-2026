const formBusca = document.getElementById("form-busca")
const inputTime = document.getElementById("input-time");
let grafico = null;

function criarConfigPizza(v, e, d) {
    return {
        type: 'pie',
        data: {
            labels: ['Vitórias', 'Empates', 'Derrotas'],
            datasets: [{
                data: [v, e, d],
                backgroundColor: [
                    'rgba(46, 204, 113, 0.8)',
                    'rgba(241, 196, 15, 0.8)',
                    'rgba(255, 59, 59, 0.8)'
                ],
                borderColor: '#131a22',
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#ffffff', padding: 16, font: { size: 14 } }
                }
            }
        }
    };
}

formBusca.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nomeDigitado = inputTime.value.trim();

    fetch(`http://localhost:3000/times/${encodeURIComponent(nomeDigitado)}`)
        .then(response => response.json())
        .then(dados => {

            const mensagemBusca = document.getElementById('mensagem-busca');
            const resultado = document.getElementById('resultado');
            const nomeTime = document.getElementById('nome-time');
            const statPosicao = document.getElementById('stat-posicao');
            const statPts = document.getElementById('stat-pts');
            const statJ = document.getElementById('stat-j');
            const statSg = document.getElementById('stat-sg');
            const statAproveitamento = document.getElementById('stat-aproveitamento');

            if (!dados) {
                mensagemBusca.textContent = 'Time não encontrado.';
                mensagemBusca.hidden = false;
                resultado.hidden = true;
                return;
            }

            mensagemBusca.hidden = true;
            resultado.hidden = false;

            nomeTime.textContent = dados.time;
            statPosicao.textContent = dados.posicao + 'º';
            statPts.textContent = dados.pts;
            statJ.textContent = dados.j;
            statSg.textContent = dados.sg;
            const aproveitamento = (dados.pts / (dados.j * 3)) * 100;
            statAproveitamento.textContent = aproveitamento.toFixed(2) + '%';
            if (grafico) {
                grafico.destroy();
            }

            const contexto = document.getElementById('grafico-pizza').getContext('2d');
            grafico = new Chart(contexto, criarConfigPizza(dados.v, dados.e, dados.d));
        })
})