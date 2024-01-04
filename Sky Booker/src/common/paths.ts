const MAIN_API_PATH = "https://interview.fio.de/core-frontend/api";
export const GET_AIRPORTS_URL = `${MAIN_API_PATH}/airports?authToken=${import.meta.env.VITE_API_AUTH_KEY}`;
export const BASE_BOOKINGS_URL = `${MAIN_API_PATH}/bookings`;
export const POST_BOOKING_URL = `${MAIN_API_PATH}/bookings/create?authToken=${import.meta.env.VITE_API_AUTH_KEY}`
export const DELETE_BOOKING_URL = `${MAIN_API_PATH}/bookings/delete`

export const GET_AIRPORTS_MOCK = `${MAIN_API_PATH}/airports`;
export const GET_BOOKINGS_MOCK = `${MAIN_API_PATH}/bookings`;
export const POST_BOOKING_MOCK = `${MAIN_API_PATH}/bookings/create`