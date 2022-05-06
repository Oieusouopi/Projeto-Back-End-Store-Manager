const express = require('express');

const app = express();

const router = require('./middlewares/Router');

app.use(express.json());

app.use(router);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
app.use((error, __req, res, __next) => {
  if (error.code) return res.status(error.code).json({ message: error.message });
  return res.status(500).json({ message: error.message });
});
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
