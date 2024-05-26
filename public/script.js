const formCadastro = document.getElementById('formCadastro');
const listaEmpresas = document.getElementById('listaEmpresas');

formCadastro.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(formCadastro);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  const response = await fetch('/cadastrar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    const empresas = await response.json();
    atualizarListaEmpresas(empresas);
    formCadastro.reset(); // Limpa o formulário após o cadastro
  } else {
    alert('Erro ao cadastrar empresa. Verifique os dados e tente novamente.');
  }
});

async function buscarEmpresas() {
  const response = await fetch('/empresas');
  if (response.ok) {
    const empresas = await response.json();
    atualizarListaEmpresas(empresas);
  } else {
    alert('Erro ao buscar empresas.');
  }
}

function atualizarListaEmpresas(empresas) {
  listaEmpresas.innerHTML = ''; // Limpa a lista antes de atualizar
  empresas.forEach(empresa => {
    const li = document.createElement('li');
    li.textContent = `CNPJ: ${empresa.cnpj}, Razão Social: ${empresa.razaoSocial}, Nome Fantasia: ${empresa.nomeFantasia}, Endereço: ${empresa.endereco}, Cidade: ${empresa.cidade}, UF: ${empresa.uf}, CEP: ${empresa.cep}, Email: ${empresa.email}, Telefone: ${empresa.telefone}`;
    listaEmpresas.appendChild(li);
  });
}

// Busca as empresas cadastradas ao carregar a página
buscarEmpresas();
