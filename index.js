import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// Lista de empresas (em memória)
let empresas = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Adiciona suporte a JSON
app.use(express.static('public'));

app.post('/cadastrar', (req, res) => {
  const { cnpj, razaoSocial, nomeFantasia, endereco, cidade, uf, cep, email, telefone } = req.body;

  // Validação dos campos
  if (!cnpj || !razaoSocial || !nomeFantasia || !endereco || !cidade || !uf || !cep || !email || !telefone) {
    return res.status(400).send('Todos os campos são obrigatórios.');
  }

  // Adiciona a empresa à lista
  empresas.push({ cnpj, razaoSocial, nomeFantasia, endereco, cidade, uf, cep, email, telefone });

  // Retorna a lista atualizada de empresas
  res.json(empresas);
});

app.get('/empresas', (req, res) => {
  res.json(empresas);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
