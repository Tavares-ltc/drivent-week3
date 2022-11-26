import { Router } from "express";
import { getHotels } from "@/controllers";
import { authenticateToken } from "@/middlewares";

const hotelsRouter = Router();

hotelsRouter
  .all("/*", authenticateToken)
  .get("/", getHotels);

export { hotelsRouter };
