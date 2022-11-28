import { prisma } from "@/config";

async function getHotels() {
  return prisma.hotel.findMany({});
}
async function getHotelWithRoomsById(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId
    },
    include: {
      Rooms: true
    }
  });
}

const hotelsRepository = {
  getHotels,
  getHotelWithRoomsById
};

export default hotelsRepository;
