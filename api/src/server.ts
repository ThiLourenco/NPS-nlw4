import express from 'express';

const app = express();
const PORT = 3333;

app.listen(PORT, () => console.log(`Server running at in port: ${PORT}`));

app.get('/', (request, response) => {
  return response.json({ message: 'Hello Wolrd!!'})
});

app.post('/', (request, response) => {
  return response.json({ message: 'Os dados foram salvos com sucesso !'});
});
