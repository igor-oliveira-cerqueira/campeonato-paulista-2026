import { times } from '../../database/bd.js';

export function definirMelhoresTimesPorVitorias(req, res) {
    let timesOrdenados = times.map(function(time) {
        time.v = parseInt(time.v);
        return time;
    })
    let melhoresTimesPorVitorias = timesOrdenados.sort(function(a, b) {
        return b.v - a.v;
    });
    res.send(melhoresTimesPorVitorias);
    return melhoresTimesPorVitorias;
}