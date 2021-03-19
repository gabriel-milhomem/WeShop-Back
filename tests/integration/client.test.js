require('dotenv-flow').config({ silent: true });

const app = require('../../src/app');
const supertest = require('supertest');
const agent = supertest(app);

const sequelize = require('../../src/utils/database');

const Helpers = require('../Helpers');

beforeEach(async () => {
  await Helpers.eraseDatabase();
});

afterAll(async () => {
  await Helpers.eraseDatabase();
  await sequelize.close();
});

describe('POST /clients', () => {
  it('should return 422 when called with wrong phone', async () => {
    const body = {
      name: 'nome teste',
      email: 'gabs@gabs.com',
      birthDate: '02/02/2000',
      phone: '3433-32'
    };

    const response = await agent.post('/clients').send(body);

    expect(response.status).toBe(422);
    expect(response.body.message).toEqual(
      'Não foi possível processar os dados!'
    );
  });

  it('should return 422 when called with wrong email', async () => {
    const body = {
      name: 'nome teste',
      email: 'gabs.com',
      birthDate: '02/02/2000',
      phone: '(34) 33433-3223'
    };

    const response = await agent.post('/clients').send(body);

    expect(response.status).toBe(422);
    expect(response.body.message).toEqual(
      'Não foi possível processar os dados!'
    );
  });

  it('should return 422 when called with wrong name', async () => {
    const body = {
      name: '/*-+',
      email: 'gabs@gabs.com',
      birthDate: '02/02/2000',
      phone: '(34) 33433-3223'
    };

    const response = await agent.post('/clients').send(body);

    expect(response.status).toBe(422);
    expect(response.body.message).toEqual(
      'Não foi possível processar os dados!'
    );
  });

  it('should return 422 when called with wrong birthDate', async () => {
    const body = {
      name: '/*-+',
      email: 'gabs@gabs.com',
      birthDate: '02/2000',
      phone: '(34) 33433-3223'
    };

    const response = await agent.post('/clients').send(body);

    expect(response.status).toBe(422);
    expect(response.body.message).toEqual(
      'Não foi possível processar os dados!'
    );
  });

  it('should return 409 when client already exist', async () => {
    await Helpers.createClient(
      'teste',
      'gabs@gabs.com',
      '03/03/2000',
      '(23) 34234-4232'
    );

    const body = {
      name: 'teste nome',
      email: 'gabs@gabs.com',
      birthDate: '02/02/2000',
      phone: '(34) 33433-3223'
    };

    const response = await agent.post('/clients').send(body);

    expect(response.status).toBe(409);
    expect(response.body.message).toEqual('Cliente já existe!');
  });

  it('should return 201 and populated the database', async () => {
    const body = {
      name: 'teste nome',
      email: 'gabs@gabs.com',
      birthDate: '02/02/2000',
      phone: '(34) 33433-3223'
    };

    const response = await agent.post('/clients').send(body);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: body.name,
        email: body.email,
        birthDate: body.birthDate,
        phone: body.phone,
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      })
    );
  });
});
