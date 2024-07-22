# api-agendamentos-consultas-nestjs
Este projeto é uma API desenvolvida em NestJS para controle de agendamentos de consultas de pacientes. Os principais recursos incluem a criação, leitura, atualização e exclusão (CRUD) de especialidades, médicos, pacientes, agendamentos e usuários. Além disso, a API é protegida com autenticação para garantir a segurança dos dados.

## Funcionalidades
* Gerenciamento de Usuários: Criação, listagem, atualização e deleção de usuários do sistema (médicos, enfermeiras ou recepcionistas, por exemplo).
* Gerenciamento de Especialidades: Criação, listagem, atualização e deleção de especialidades médicas, além de possibilidade de visualização de detelhes de cada especialidade.
* Gerenciamento de Médicos: Criação, listagem, atualização e deleção de médicos, além de possibilidade de visualização de detelhes de cada médico.
* Gerenciamento de Pacientes: Criação, listagem, atualização e deleção de pacientes, além de possibilidade de visualização de detelhes de cada paciente.
* Gerenciamento de Agendamentos: Criação de vagas de agendamento, listagem, atualização e deleção de agendamentos, além de possibilidade de visualização de detelhes de cada vaga ou agendamento.
* Autenticação: Proteção de todas as rotas com autenticação.
* CRUD Completo: Operações completas de CRUD para todas as entidades.

## Tecnologias Utilizadas
* NestJS: Framework para construção de aplicações backend escaláveis.
* Prisma: ORM para gerenciamento de banco de dados.
* PostgreSQL: Banco de dados relacional.
* TypeScript: Superset do JavaScript, que adiciona tipagem estática e outros recursos avançados à linguagem.

## Endpoints Disponíveis:
Autenticação (todas as requisições precisarão de token):
* POST /auth/register: Cria um usuário e já retorna um token válido (para que não haja a necessidade de criar um user e depois logar para criar um token).
* POST /auth/login: Loga na aplicação e retorna um token válido.

Users:
* POST /users: Cria um usuário com os dados passados no body.
* GET /user/{id}: Retorna um usuário.
* GET /users: Retorna todos os usuários.
* PATCH /users/{id}: Atualiza um parcialmente atributos do usuário com base no id passado na URL (para identificar o usuário) e no(s) atributo(s) passado(s) no body.
* PUT /users/{id}: Atualiza todos os atributos do usuário com base no id passado na URL (para identificar o usuário) e no(s) atributo(s) passado(s) no body.
* DELETE /alunos/{id}: Deleta um usuário.

Médico:
* POST /medico: Cria um médico com os dados passados no body.
* GET /medico/{id}: Retorna um médico.
* GET /medico: Retorna todos os médicos.
* PATCH /medico/{id}: Atualiza um parcialmente atributos do médico com base no id passado na URL (para identificar o médico) e no(s) atributo(s) passado(s) no body.
* PUT /medico/{id}: Atualiza todos os atributos do médico com base no id passado na URL (para identificar o médico) e no(s) atributo(s) passado(s) no body.
* DELETE /medico/{id}: Deleta um médico.

Especialidades:
* POST /especialidade: Cria uma especialidade com os dados passados no body.
* GET /especialiaidade/{id}: Retorna uma especialidade.
* GET /especialidade: Retorna todas as especialidades.
* PATCH /especialidade/{id}: Atualiza um parcialmente atributos de uma especialidade com base no id passado na URL (para identificar a especialidade) e no(s) atributo(s) passado(s) no body.
* PUT /especialidade/{id}: Atualiza todos os atributos da especialidade com base no id passado na URL (para identificar a especialidade) e no(s) atributo(s) passado(s) no body.
* DELETE /especialidade/{id}: Deleta uma especialidade.

Medico_Especialidade:
* POST /medico-especialidade: Cria um registro-relação entre médico e especialidade.
* GET /medico-especialidade/{id}: Retorna um registro-relação entre médico e especialidade.
* GET /medico-especialidade: Retorna todos os registros-relação entre médico e especialidade.
* DELETE /medico-especialidade/{id}: Deleta um registro-relação entre médico e especialidade.

Paciente:
* POST /paciente: Cria um paciente com os dados passados no body.
* GET /paciente/{id}: Retorna um paciente.
* GET /paciente: Retorna todos os pacientes.
* PATCH /paciente/{id}: Atualiza um parcialmente atributos do paciente com base no id passado na URL (para identificar o paciente) e no(s) atributo(s) passado(s) no body.
* PUT /paciente/{id}: Atualiza todos os atributos do paciente com base no id passado na URL (para identificar o paciente) e no(s) atributo(s) passado(s) no body.
* DELETE /paciente/{id}: Deleta um paciente.

Agendamento:
* POST /agendamento: Cria vagas de agendamento, contato que exista um médico e especialidade válidos (relação médico-especialiade), com base nos dados passados no body.
* GET /agendamento-by-oaciente-id/{id}: Retorna os agendamentos existentes do paciente, com base no id do paciente passado na URL.
* GET /agendamento: Retorna todos os agendamentos (entre vagas disponíveis e agendamentos já efetuados).
* PATCH /agendar-paciente/{id}: Atualiza um parcialmente atributos do agendamento, agendando um paciente na vaga disponível, com base no id da vaga passada na url e o id do paciente passado no body.
* PATCH /remove-paciente/{id}: Atualiza um parcialmente atributos do agendamento, removendo um paciente na vaga passada na url e o id do paciente passado no body.
* DELETE /agendamento/{id}: Deleta uma vaga de agendamento desde que não tenha paciente agendado nela.

## Utilização:
Para começar a utilizar a API, siga os seguintes passos:
Instale as dependências necessárias.
Inicie o servidor onde a API está hospedada.
Comece a interagir com a API para gerenciar os sistema de agendamentos de consultas.

## Exemplo de Requisição:
Para adicionar um novo conjunto de vagas de agendamento, basta enviar uma requisição POST para o endpoint /agendamento com os dados das vagas que serão inseridas no corpo da requisição no formato JSON:
```json
{
	"data_inicial": "2024-07-22",
	"data_final": "2024-07-24",
	"duracao_consulta": 30,
	"id_medico": 5,
	"id_especialidade": 1
}
```

## Alguns dos endpoints no Insomnia:
![image](https://github.com/user-attachments/assets/506a9d51-0b5c-475f-b768-178e55000cd8)
![image](https://github.com/user-attachments/assets/9cd3c1df-051d-4c38-ae4f-7bb9298ecb30)
![image](https://github.com/user-attachments/assets/46d3d5aa-6110-4f93-8f69-f3230e359b32)
![image](https://github.com/user-attachments/assets/ce1927bb-bf23-424a-b339-8a687176cc98)
![image](https://github.com/user-attachments/assets/cd629b27-a35e-432e-a0f3-4abba000d592)

## DER:
![Diagrama ER de banco de dados (agendamentos-consultas) (2)](https://github.com/user-attachments/assets/546bc69c-c7fd-4172-8227-e22a2a621b2d)


