const axios = require('axios');
const { Worker, isMainThread } = require('worker_threads');
// http://challenge.dienekes.com.br/api/numbers?page=2
const arr = [];

function arrTeste(i, v) {
  for (let index = i; index < v; index += 1) {
    const worker = new Worker(__filename, { env: { LEADING_ZEROES: 4 } });
    worker.once('message', (message) => {
      final.push(message)
      finishedWorkers++
      if (finishedWorkers === payloads.length) console.log(final)
    })
    const prom = axios.get(`http://challenge.dienekes.com.br/api/numbers?page=${index}`);
    arr.push(prom);
  }
}

async function fetchApi() {
  console.time('timer');
  for (let index = 1; index < 10000; index += 100) {
    arrTeste(index, index + 9);
    arrTeste(index + 10, index + 19);
    arrTeste(index + 20, index + 29);
    arrTeste(index + 30, index + 39);
    arrTeste(index + 40, index + 49);
    arrTeste(index + 50, index + 59);
    arrTeste(index + 60, index + 69);
    arrTeste(index + 70, index + 79);
    arrTeste(index + 80, index + 89);
    arrTeste(index + 90, index + 99);
  }
  console.timeEnd('timer');
}

fetchApi();

async function resolvePromisses() {
  console.time('promisse');
  const newArr = await Promise.all(arr);
  console.log(newArr);
  console.timeEnd('promisse');
}

resolvePromisses();
