Documentação de API
Esta documentação descreve os endpoints disponíveis na API, incluindo exemplos de requisições e respostas.


Registro de Usuário
Endpoint: POST /api/usuarios/register
Descrição: Registra um novo usuário.

Request Body:

{
    "nome": "string",
    "cpf": "string",
    "senha": "string",
    "apartamento": "string"
}

Response:

{
    "id": "string",
    "nome": "string",
    "cpf": "string",
    "senha": "string",
    "apartamento": "string"
}

------------------------------------------------

Login de Usuário
Endpoint: POST /api/usuarios/login
Descrição: Faz login do usuário.

Request Body:

{
    "cpf": "string",
    "senha": "string"
}


Response:

{
    "id": "string",
    "nome": "string",
    "cpf": "string",
    "apartamento": "string"
}

------------------------------------------------

Listar Usuários
Endpoint: GET /api/usuarios
Descrição: Lista todos os usuários.

Response:

{
    "usuarios": [
        {
            "id": "string",
            "nome": "string",
            "cpf": "string",
            "senha": "string",
            "apartamento": "string"
        }
    ]
}

------------------------------------------------

Deletar Usuário

Endpoint: DELETE /api/usuarios/:id
Descrição: Deleta um usuário pelo ID.

Response: 204 No Content

------------------------------------------------

Buscar Usuário por CPF
Endpoint: GET /api/usuarios/cpf/:cpf
Descrição: Busca um usuário pelo CPF.

Response:

{
    "id": "string",
    "nome": "string",
    "cpf": "string",
    "senha": "string",
    "apartamento": "string"
}

------------------------------------------------


Buscar Usuário por ID

Endpoint: GET /api/usuarios/:id
Descrição: Busca um usuário pelo ID.

Response:

{
    "id": "string",
    "nome": "string",
    "cpf": "string",
    "senha": "string",
    "apartamento": "string"
}

Gerenciamento de Reservas

Criar Reserva
Endpoint: POST /api/reservas
Descrição: Cria uma nova reserva.

Request Body:

{
    "area": "string",
    "data": "Date",
    "usuarioId": "string"
}

Response:

{
    "id": "string",
    "area": "string",
    "data": "Date",
    "usuario": {
        "id": "string",
        "nome": "string",
        "apartamento": "string"
    }
}

------------------------------------------------

Listar Reservas
Endpoint: GET /api/reservas
Descrição: Lista todas as reservas.

Response:

{
    "reservas": [
        {
            "id": "string",
            "area": "string",
            "data": "Date",
            "usuario": {
                "id": "string",
                "nome": "string",
                "apartamento": "string"
            }
        }
    ]
}

------------------------------------------------

Buscar Reserva por ID
Endpoint: GET /api/reservas/:id
Descrição: Busca uma reserva pelo ID.

Response:

{
    "id": "string",
    "area": "string",
    "data": "Date",
    "usuario": {
        "id": "string",
        "nome": "string",
        "apartamento": "string"
    }
}

------------------------------------------------

Editar Reserva
Endpoint: PUT /api/reservas/:id
Descrição: Edita uma reserva existente.

Request Body:

{
    "area": "string",
    "data": "Date"
}

Response: 204 No Content

------------------------------------------------

Cancelar Reserva
Endpoint: DELETE /api/reservas/:id
Descrição: Cancela uma reserva pelo ID.

Response: 204 No Content

------------------------------------------------

Gerenciamento de Avisos
Criar Aviso
Endpoint: POST /api/avisos
Descrição: Cria um novo aviso.

Request Body:

{
    "tipo": "string",
    "assunto": "string",
    "descricao": "string"
}

Response:

{
    "id": "string",
    "tipo": "string",
    "assunto": "string",
    "descricao": "string",
    "data": "Date"
}

------------------------------------------------

Listar Avisos
Endpoint: GET /api/avisos
Descrição: Lista todos os avisos.

Response:

{
    "avisos": [
        {
            "id": "string",
            "tipo": "string",
            "assunto": "string",
            "descricao": "string",
            "data": "Date"
        }
    ]
}

------------------------------------------------

Buscar Aviso por ID
Endpoint: GET /api/avisos/:id
Descrição: Busca um aviso pelo ID.

Response:

{
    "id": "string",
    "tipo": "string",
    "assunto": "string",
    "descricao": "string",
    "data": "Date"
}

------------------------------------------------

Editar Aviso
Endpoint: PUT /api/avisos/:id
Descrição: Edita um aviso existente.

Request Body:

{
    "tipo": "string",
    "assunto": "string",
    "descricao": "string"
}

Response: 204 No Content

------------------------------------------------

Deletar Aviso
Endpoint: DELETE /api/avisos/:id
Descrição: Deleta um aviso pelo ID.

Response: 204 No Content
