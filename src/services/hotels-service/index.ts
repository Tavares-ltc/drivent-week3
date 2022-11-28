import { notFoundError, unauthorizedError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import hotelsRepository from "@/repositories/hotels-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { TicketStatus } from "@prisma/client";

async function verifyTicketData(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if(ticket.status === TicketStatus.RESERVED || !ticket) throw unauthorizedError();
  const ticketType = await ticketRepository.findTickeWithTypeById(ticket.id);
  if(!ticketType.TicketType.includesHotel || ticketType.TicketType.isRemote) throw notFoundError();
}

async function getHotels(userId: number) {
  await verifyTicketData(userId);
  return hotelsRepository.getHotels();
}

async function getHotelWithRoomsById(userId: number, hotelId: number) {
  const hotelWithRooms = await hotelsRepository.getHotelWithRoomsById(hotelId);
  if(!hotelWithRooms) throw notFoundError();
  return hotelWithRooms;
}
const hotelsService = {
  getHotels,
  getHotelWithRoomsById
};

export default hotelsService;
