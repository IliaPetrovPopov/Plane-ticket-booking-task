import { AppDispatch, Booking } from "../common/types";
import { deleteBooking } from "../thunks/bookings/deleteBooking";

export const onDeleteBookingClick = async (
  dispatch: AppDispatch,
  booking: Booking
) => {
  
  await dispatch(deleteBooking(booking)).unwrap();
};
