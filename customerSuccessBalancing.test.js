// customerSuccessBalancing.test.js
const customerSuccessBalancing = require('./customerSuccessBalancing');

test('deve retornar o id do CS que atende mais clientes', () => {
  const csScores = [
    { id: 1, score: 50 },
    { id: 2, score: 100 },
    // Adicione mais CSs conforme necessário
  ];

  const customerScores = [
    { id: 1, score: 20 },
    { id: 2, score: 30 },
    // Adicione mais clientes conforme necessário
  ];

  const unavailableCSIds = [2]; // CSs de folga

  expect(customerSuccessBalancing(csScores, customerScores, unavailableCSIds)).toBe(1);
});
