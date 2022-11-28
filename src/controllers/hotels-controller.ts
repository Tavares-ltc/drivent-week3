import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import hotelsService from "@/services/hotels-service";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const hotels = await hotelsService.getHotels(userId);
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if(error.name === "UnauthorizedError") return res.sendStatus(httpStatus.UNAUTHORIZED);
    if(error.name === "NotFoundError") return res.status(200).send([]);
    
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getHotelWithRoomsById(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const hotelId = Number(req.params.hotelId);
  if(!hotelId) return res.sendStatus(httpStatus.BAD_REQUEST);
  try {
    const hotelWithRooms = await hotelsService.getHotelWithRoomsById(userId, hotelId);
    return res.status(httpStatus.OK).send(hotelWithRooms);
  } catch (error) {
    if(error.name === "UnauthorizedError") return res.sendStatus(httpStatus.UNAUTHORIZED);
    if(error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
