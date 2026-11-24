import { times } from '../../database/bd.js';

export function definirTimesPorGols(req, res) {
    let timersOrdenados = times.map(function(time) {
        time.sg = parseInt(time.sg);
        return time;
    });

    timersOrdenados.sort(function(a, b) {
        return b.sg - a.sg;
    });

    let melhoresTimesPorGols = timersOrdenados.slice(0, 4);
    res.send(melhoresTimesPorGols);
    return melhoresTimesPorGols;
}