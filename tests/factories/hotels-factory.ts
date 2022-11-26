import faker from "@faker-js/faker";
import { prisma } from "@/config";
import { Booking, Hotel, Room, TicketStatus } from "@prisma/client";

export function createHotel(): Promise<Hotel> {
  return prisma.hotel.create({
    data: {
      name: "Hotel",
      image: faker.image.city()
    }
  });
}

export function createRoom(hotelId: number): Promise<Room> {
  return prisma.room.create({
    data: {
      name: faker.random.numeric(2),
      capacity: 3,
      hotelId
    }
  });
}

export function createBooking(userId: number, roomId: number): Promise<Booking> {
  return prisma.booking.create({
    data: {
      userId,
      roomId
    }
  });
}
