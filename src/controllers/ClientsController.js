const Client = require('../models/Client');
const Utils = require('../utils/Utils');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');

class CoursesController {
  async createClient(clientData) {
    await this.haveClientRegistered(clientData.email);

    clientData.name = Utils.capitalizeAllAndTrim(clientData.name);
    const createdClient = await Client.create(clientData);

    return createdClient;
  }

  async haveClientRegistered(email) {
    const client = await Client.findOne({
      where: { email }
    });

    if (client) {
      throw new ConflictError('Cliente');
    }

    return client;
  }

  getAllClients() {
    return Client.findAll();
  }

  async getClient(id) {
    const client = await Client.findByPk(id);

    if (!client) {
      throw new NotFoundError('Cliente');
    }

    return client;
  }
}

module.exports = new CoursesController();
