// modulos externos
import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// modulos internos
import { times } from '../database/bd.js';
import { definirTimesPorGols } from './funcoes/definirTimesPorGols.js';
import { definirMelhoresTimesPorPontos } from './funcoes/definirMelhoresTimesPorPontos.js';
import { definirMelhoresTimesPorVitorias } from './funcoes/definirTimesPorVitórias.js';
import { definirTimesProximaFase } from './funcoes/definirTimesProximaFase.js';
import { calcularAproveitamento } from './funcoes/calcularAproveitamento.js';
import { pesquisar } from './funcoes/pesquisarTime.js';

const app = express()

const backendDirectory = path.dirname(fileURLToPath(import.meta.url));
const frontendDirectory = path.resolve(backendDirectory, '../../frontend');

app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:5500']
}))

app.use(express.static(frontendDirectory));

app.get('/times/por-gols', (req, res) => {
  definirTimesPorGols(req, res);
});

app.get('/times/oito-melhores', (req, res) => {
  definirMelhoresTimesPorPontos(req, res);
});

app.get('/times/proxima-fase', (req, res) => {
  definirTimesProximaFase(req, res);
});

app.get('/times/aproveitamento', (req, res) => {
  calcularAproveitamento(req, res);
});

app.get('/times/melhores', (req, res) => {
  definirMelhoresTimesPorPontos(req, res);
});

app.get('/times/proxima-fase', (req, res) => {
  definirTimesProximaFase(req, res);
});

app.get('/times/aproveitamento', (req, res) => {
  calcularAproveitamento(req, res);
});

app.get('/times/melhores', (req, res) => {
  definirMelhoresTimesPorPontos(req, res);
});

app.get('/times/:quantidade', (req, res, next) => {
  const quantidade = parseInt(req.params.quantidade);

  if (isNaN(quantidade)) {
    return next(); // não é número, passa para a próxima rota
  }

  const timesSelecionados = times.slice(0, Math.min(quantidade, times.length));
  res.json(timesSelecionados);
})

app.get('/times/:timePesquisado', (req, res) => {
  let timePesquisado = req.params.timePesquisado;
  const resultado = pesquisar(timePesquisado);
  res.json(resultado);
})

app.get('/', (req, res) => {
  res.send('Hello World')
}) 

app.get('/times', (req, res) => {
  res.json(times)
}) 

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})