
const { default: axios } = require('axios');

describe('Testando as rotas do Servidor', () => {
  test('Listar Alunos', async () => {
      const response = await axios.get('http://localhost:3333/alunos')

      const data = {
        alunos: [
          {
            id: 1,
            nome: "Cleíverson",
            curso: "Sistemas de Informação",
            semestre: 2,
            email: "clei@email.com",
            senha: "$2b$10$YWFu3z4SeLtFjxshHx68Ie26BYERCih2kGh3k/eW7NmME2rr6yeK2",
            telefone: "(88) 99292-9292"
          },
          {
            id: 2,
            nome: "Jeferson",
            curso: "Sistemas de Informação",
            semestre: 7,
            email: "jeferson@email.com",
            senha: "$2b$10$ERY.hFITdV1OwAPz6GSbF.WhPKecIViR8pXZ053fXq6ZOSBNOllaC",
            telefone: "(88) 99292-9290"
          }
        ],
        status: 200
      }

      expect(response.data).toStrictEqual(data);
  });

  test('Listar Encontros', async () => {
    const response = await axios.get('http://localhost:3333/encontros')

    const data = {
      assuntos: [
        {
          id: 1,
          assunto_id: 1,
          data: "2022-04-26T03:00:00.000Z"
        },
        {
          id: 3,
          assunto_id: 1,
          data: "2022-07-25T03:00:00.000Z"
        }
      ],
      status: 200
    }

    expect(response.data).toStrictEqual(data);
});

test('Listar Assuntos', async () => {
  const response = await axios.get('http://localhost:3333/assuntos')

  const data = {
    assuntos: [
      {
        id: 1,
        nome: "HTML, CSS e JAVASCRIPT",
        grau_dificuldade: 3,
        tempo_necessario: 4
      }
    ],
    status: 200
  }

  expect(response.data).toStrictEqual(data);
});

});