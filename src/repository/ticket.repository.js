import dao from "../dao/index.factory.js"; // O la ruta donde instancies los managers

const { TicketsManager } = dao; // Asegúrate de exportar "TicketsManager" en tu factory

class TicketsRepository {
  async createTicket(data) {
    return await TicketsManager.create(data);
  }
  async getTicketById(id) {
    return await TicketsManager.readById(id);
  }
  async getTickets(query) {
    return await TicketsManager.read(query);
  }
}

const repository = new TicketsRepository();
export default repository;
