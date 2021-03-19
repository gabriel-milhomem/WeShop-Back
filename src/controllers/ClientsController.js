const Client = require('../models/Client');
const ConflictError = require('../errors/ConflictError');

class CoursesController {
  async createClient(clientData) {
    const client = await Client.findOne({
      where: { email: clientData.email }
    });

    if (client) {
      throw new ConflictError('Cliente');
    }

    const createdClient = await Client.create(clientData);

    return createdClient;
  }

  getAllClients() {
    return Client.findAll();
  }
}

module.exports = new CoursesController();
