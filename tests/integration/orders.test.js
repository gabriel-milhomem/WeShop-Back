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

describe('POST /orders', () => {
  it('should return 422 when quantity input is less then 1', async () => {
    const body = { clientId: 3, orders: [{ productId: 3, quantity: 0 }] };
    const response = await agent.post('/api/orders').send(body);

    expect(response.status).toBe(422);
    expect(response.body.message).toEqual(
      'Não foi possível processar os dados!'
    );
  });

  it('should return 404 when clientId is not found', async () => {
    const body = { clientId: 0, orders: [{ productId: 3, quantity: 1 }] };
    const response = await agent.post('/api/orders').send(body);

    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('Cliente não encontrado!');
  });

  it('should return 404 when productId is not found', async () => {
    const client = await Helpers.createClient();
    const body = {
      clientId: client.id,
      orders: [{ productId: 0, quantity: 1 }]
    };

    const response = await agent.post('/api/orders').send(body);

    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('Produto não encontrado!');
  });

  it('should return 201 created orders', async () => {
    const client = await Helpers.createClient();
    const product = await Helpers.createProduct();

    const body = {
      clientId: client.id,
      orders: [{ productId: product.id, quantity: 1 }]
    };

    const response = await agent.post('/api/orders').send(body);

    expect(response.status).toBe(201);
  });
});

describe('PUT /orders', () => {
  let client, product;

  beforeEach(async () => {
    client = await Helpers.createClient();
    product = await Helpers.createProduct();
    await Helpers.createOrder(client.id, product.id);
  });

  it('should return 422 when quantity input is less then 1', async () => {
    const body = { clientId: 3, orders: [{ productId: 3, quantity: 0 }] };
    const response = await agent.put(`/api/orders/0`).send(body);

    expect(response.status).toBe(422);
    expect(response.body.message).toEqual(
      'Não foi possível processar os dados!'
    );
  });

  it('should return 404 when clientId is not found', async () => {
    const body = { clientId: 0, orders: [{ productId: 0, quantity: 1 }] };
    const response = await agent.put(`/api/orders/0`).send(body);

    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('Cliente não encontrado!');
  });

  it('should return 404 when order id is not found', async () => {
    const body = {
      clientId: client.id,
      orders: [{ productId: product.id, quantity: 1 }]
    };
    const response = await agent.put(`/api/orders/0`).send(body);

    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('Pedido não encontrado!');
  });

  it('should return 404 when productId is not found', async () => {
    const body = {
      clientId: client.id,
      orders: [{ productId: 0, quantity: 1 }]
    };

    const response = await agent.put(`/api/orders/0`).send(body);

    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('Produto não encontrado!');
  });
});

describe('GET /orders', () => {
  it('should return 200 and get all orders', async () => {
    const client = await Helpers.createClient();
    const product = await Helpers.createProduct();
    const { order } = await Helpers.createOrder(client.id, product.id);

    const response = await agent.get('/api/orders');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...order,
          client: expect.objectContaining(client),
          total: 100,
          products: expect.arrayContaining([
            expect.objectContaining({
              ...product,
              quantity: 2,
              partialValue: 100
            })
          ])
        })
      ])
    );
  });
});

describe('DELETE /orders', () => {
  it('should return 404 when order id is not found', async () => {
    const client = await Helpers.createClient();
    const product = await Helpers.createProduct();
    const body = {
      clientId: client.id,
      orders: [{ productId: product.id, quantity: 1 }]
    };
    const response = await agent.delete(`/api/orders/0`).send(body);

    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('Pedido não encontrado!');
  });
});
