import { times } from '../../database/bd.js';

export function pesquisar(timePesquisado) {
    const pesquisa = timePesquisado.toLowerCase();

    const timeEncontrado = times.find(
        time => time.time.toLowerCase() === pesquisa
    );

    return timeEncontrado || null;
}