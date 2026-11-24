import { times } from '../../database/bd.js';
import { definirMelhoresTimesPorPontos } from './definirMelhoresTimesPorPontos.js';
import { definirMelhoresTimesPorVitorias } from './definirTimesPorVitórias.js';
import { definirTimesPorGols } from './definirTimesPorGols.js';

export function definirTimesProximaFase(req, res) {
    let melhoresTimes = definirMelhoresTimesPorPontos(req, res);
    let melhoresTimesPorVitorias = definirMelhoresTimesPorVitorias(req, res);
    let melhoresTimesPorGols = definirTimesPorGols(req, res);

    let timesProximaFase = melhoresTimes.concat(melhoresTimesPorGols, melhoresTimesPorVitorias);
    timesProximaFase.sort(function(a, b) {
        return b.pts - a.pts || b.v - a.v || b.sg - a.sg;
    });
    res.send(timesProximaFase.slice(0, 8));
    return timesProximaFase.slice(0, 8);
}