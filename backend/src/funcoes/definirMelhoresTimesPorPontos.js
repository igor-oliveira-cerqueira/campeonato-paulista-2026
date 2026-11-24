import { times } from '../../database/bd.js';

export function definirMelhoresTimesPorPontos(req, res) {
    let timesOrdenados = times.map(function(time) {
        time.pts = parseInt(time.pts);
        return time;
    });

    timesOrdenados.sort(function(a, b) {
            return b.pts - a.pts;
        });

        res.send(timesOrdenados.slice(0, 8));
        return timesOrdenados.slice(0, 8);
}