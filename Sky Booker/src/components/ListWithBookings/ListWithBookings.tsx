import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchBookings } from "../../thunks/bookings/fetchBookings";
import {
  getAllBookings,
  getBookingsStatus,
} from "../../features/bookings/bookingsSlice";
import { Booking } from "../../common/types";

const ListWithBookings: React.FC = () => {
  const dispatch = useAppDispatch();

  const effectRan = useRef(false);

  const bookings = useAppSelector(getAllBookings);
  const bookingsStatus = useAppSelector(getBookingsStatus);

  useEffect(() => {
    if (effectRan.current === false) {
      if (bookingsStatus === "idle") {
        dispatch(fetchBookings()).unwrap();
      }

      return () => {
        effectRan.current = true;
      };
    }
  }, [dispatch, bookingsStatus]);

  return (
    <section>
      {bookings.map((booking: Booking) => (
        <div key={booking.id}>
          <p>{booking.firstName}</p>
        </div>
      ))}
    </section>
  );
};

export default ListWithBookings;
