const Client = require('../models/Client');
const Utils = require('../utils/Utils');
const ConflictError = require('../errors/ConflictError');

class CoursesController {
  async createClient(clientData) {
    const client = await Client.findOne({
      where: { email: clientData.email }
    });

    if (client) {
      throw new ConflictError('Cliente');
    }

    clientData.name = Utils.capitalizeAllAndTrim(clientData.name);
    const createdClient = await Client.create(clientData);

    return createdClient;
  }

  getAllClients() {
    return Client.findAll();
  }
}

module.exports = new CoursesController();
