import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchBookings } from "../../thunks/bookings/fetchBookings";
import {
  getAllBookings,
  getBookingsStatus,
} from "../../features/bookings/bookingsSlice";
import { Booking } from "../../common/types";
import SingleBooking from "../SingleBooking/SingleBooking";

const ListWithBookings: React.FC = () => {
  const dispatch = useAppDispatch();

  const effectRan = useRef(false);

  const bookings = useAppSelector(getAllBookings);
  const bookingsStatus = useAppSelector(getBookingsStatus);

  useEffect(() => {
    if (effectRan.current === false) {
      if (bookingsStatus === "idle") {
        dispatch(fetchBookings());
      }

      return () => {
        effectRan.current = true;
      };
    }
  }, [dispatch, bookingsStatus]);

  return (
    <section>
      {bookings.map((booking: Booking) => (
        <SingleBooking key={booking.id} booking={booking} />
      ))}
    </section>
  );
};

export default ListWithBookings;
