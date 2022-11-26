import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import hotelsService from "@/services/hotels-service";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  try {
    const hotels = await hotelsService.getHotels();
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
