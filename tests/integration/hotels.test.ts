import app, { init } from "@/app";
import httpStatus from "http-status";
import supertest from "supertest";
import { cleanDb, generateValidToken } from "../helpers";
import prisma, { TicketStatus } from "@prisma/client";
import { createEnrollmentWithAddress, createTicket, createTicketType, createTicketTypeChosingHotelType, createUser } from "../factories";
import { createBooking, createHotel, createRoom } from "../factories/hotels-factory";
beforeAll(async () => {
  await init();
  await cleanDb();
});
beforeEach(async () => {
  await cleanDb();
});
const server = supertest(app);

describe("GET /hotels", () => {
  it("should respond with empty array when there are no hotels", async () => {
    const token = await generateValidToken();
    const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual([]);
  });
  it("should respond with status 200 and with existing hotels data", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const enrollment = await createEnrollmentWithAddress(user);
    const ticketType = await createTicketTypeChosingHotelType(true);
    await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
    const hotel = await createHotel();
      
    const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual([
      {
        id: hotel.id,
        name: hotel.name,
        image: hotel.image,
        createdAt: hotel.createdAt.toISOString(),
        updatedAt: hotel.updatedAt.toISOString(),
      },
    ]);
  });
  it("should respond with status 401 if given token is not valid", async () => {
    const token = "not valid";
    const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
});
