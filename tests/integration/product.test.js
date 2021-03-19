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

describe('POST /products', () => {
  it('should return 422 when called with invalid name', async () => {
    const body = { name: 2, price: 1234 };
    const response = await agent.post('/api/products').send(body);

    expect(response.status).toBe(422);
    expect(response.body.message).toEqual(
      'Não foi possível processar os dados!'
    );
  });

  it('should return 422 when called with an invalid price', async () => {
    const body = { price: -3, name: 'Televisão' };
    const response = await agent.post('/api/products').send(body);

    expect(response.status).toBe(422);
    expect(response.body.message).toEqual(
      'Não foi possível processar os dados!'
    );
  });

  it('should return 409 when product already exist', async () => {
    await Helpers.createProduct('televisão', 7888);
    const body = { price: 2344, name: 'TELEVISÃO' };
    const response = await agent.post('/api/products').send(body);

    expect(response.status).toBe(409);
    expect(response.body.message).toEqual('Produto já existe!');
  });

  it('should return 201 and populated the database', async () => {
    const body = { price: 2344, name: 'televisão' };
    const response = await agent.post('/api/products').send(body);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: body.name,
        price: body.price,
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      })
    );
  });
});

describe('GET /api/products', () => {
  it('should return 201 and populated the database', async () => {
    const product1 = await Helpers.createProduct('Mouse', 44423);
    const product2 = await Helpers.createProduct('Celular', 32342);

    const response = await agent.get('/api/products');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining(product1),
        expect.objectContaining(product2)
      ])
    );
  });
});
