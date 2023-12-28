const MAIN_API_PATH = "https://interview.fio.de/core-frontend/api";
export const GET_AIRPORTS_URL = `${MAIN_API_PATH}/airports?authToken=${import.meta.env.VITE_API_AUTH_KEY}`;
export const GET_BOOKINGS_URL = `${MAIN_API_PATH}/bookings?pageIndex=0&authToken=${import.meta.env.VITE_API_AUTH_KEY}`;
export const POST_BOOKING_URL = `${MAIN_API_PATH}/bookings/create?authToken=${import.meta.env.VITE_API_AUTH_KEY}`
export const DELETE_BOOKING_URL = `${MAIN_API_PATH}/bookings/delete`