import { Router } from "express";
import { getHotels, getHotelWithRoomsById } from "@/controllers";
import { authenticateToken } from "@/middlewares";

const hotelsRouter = Router();

hotelsRouter
  .all("/*", authenticateToken)
  .get("/", getHotels)
  .get("/:hotelId", getHotelWithRoomsById);
export { hotelsRouter };
