import hotelsRepository from "@/repositories/hotels-repository";

async function getHotels() {
  return hotelsRepository.getHotels();
}

const hotelsService = {
  getHotels
};

export default hotelsService;
