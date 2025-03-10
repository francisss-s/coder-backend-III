import dao from "../dao/index.factory.js";

const { TicketsManager } = dao;

class TicketsRepository {
  async createTicket(data) {
    return await TicketsManager.create(data);
  }

  async getTicketById(id) {
    return await TicketsManager.readById(id);
  }

  async getTickets(query = {}) {
    return await TicketsManager.read(query);
  }

  async updateTicket(id, data) {
    return await TicketsManager.update(id, data);
  }

  async deleteTicket(id) {
    return await TicketsManager.destroy(id);
  }
}

const repository = new TicketsRepository();
const { createTicket, getTicketById, getTickets, updateTicket, deleteTicket } = repository;

export { createTicket, getTicketById, getTickets, updateTicket, deleteTicket };
