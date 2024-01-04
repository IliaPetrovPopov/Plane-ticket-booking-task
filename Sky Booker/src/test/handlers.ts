import { HttpResponse, delay, http } from "msw";
import {
  GET_AIRPORTS_MOCK,
  GET_BOOKINGS_MOCK,
  POST_BOOKING_MOCK,
} from "../common/paths";
import { preloadedState } from "../utils/test-utils";

export const handlers = [
  http.get(GET_AIRPORTS_MOCK, async () => {
    await delay(150);
    return HttpResponse.json(preloadedState.airports);
  }),
  http.get(GET_BOOKINGS_MOCK, async () => {
    await delay(150);
    return HttpResponse.json(preloadedState.bookings);
  }),

  http.post(POST_BOOKING_MOCK, () => {
    const {
      id,
      firstName,
      lastName,
      departureAirportId,
      arrivalAirportId,
      departureDate,
      returnDate,
    } = preloadedState.bookings.bookings[0];

    return HttpResponse.json({
      id,
      firstName,
      lastName,
      departureAirportId,
      arrivalAirportId,
      departureDate,
      returnDate,
    });
  }),
];
