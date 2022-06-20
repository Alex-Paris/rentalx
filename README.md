# Cadastro de Carro

**RF**
Deve ser possível cadastrar um novo carro.

**RN**
Não deve ser possível cadastrar um carro com uma placa já inserida
Não deve ser possível alterar uma placa de um carro já inserido
O cadastro do carro por padrao, com disponibilidade
Apenas usuário administrador poderá cadastrar

# Listagem de Carros

**RF**
Listar todos os carros disponíveis
Listar todos os carros disponíveis pelo nome da categoria
Listar todos os carros disponíveis pelo nome da marca
Listar todos os carros disponíveis pelo nome do carro

**RN**
Não precisa ser usuário para realizar a consulta

# Cadastro de especificacao de carro

**RF**
Possivel cadastrar uma especificacao de carro
Possivel listar todas as especificacoes
Possivel listar todos os carros

**RN**
Nao deve ser possivel cadastrar uma especificacao sem carro
Nao deve ser possivel cadastrar uma especificacao para um carro que ja o possua
Apenas usuário administrador poderá cadastrar

# Cadastro de imagens do carro

**RF**
Possivel cadastrar uma imagem do carro
Possivel listar todos os carros

**RNF**
Multer para upload da imagem

**RN**
Deve ser possivel cadastrar mais de uma imagem para o mesmo carro
Apenas usuário administrador poderá cadastrar

# Aluguel de carro 

**RF**
Possivel cadastrar um aluguel

**RN**
Deve ter duracao minima de 24h
Nao deve ser possivel cadastrar um novo aluguel caso o usuario ja possua um aberto
Nao deve ser possivel cadastrar um novo aluguel caso o carro ja possua um aberto