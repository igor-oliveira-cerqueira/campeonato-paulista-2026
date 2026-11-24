import { times } from '../../database/bd.js'

export function calcularAproveitamento(req, res) {
    let timesOrdenados = times.map(function(time) {
        time.pts = parseInt(time.pts);
        time.v = parseInt(time.v);
        time.sg = parseInt(time.sg);
        time.j = parseInt(time.j);

        let pontosPossiveis = time.j * 3;
        time.aproveitamento = ((time.pts / pontosPossiveis) * 100).toFixed(2) + '%';
        return time;
    });

    timesOrdenados.sort(function(a, b) {
        return (b.pts - a.pts) || (b.v - a.v) || (b.sg - a.sg);
    });

    res.send(timesOrdenados);
    return timesOrdenados;
}