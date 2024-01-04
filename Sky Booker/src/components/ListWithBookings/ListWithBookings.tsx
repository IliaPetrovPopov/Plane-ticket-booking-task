import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchBookings } from "../../thunks/bookings/fetchBookings";
import {
  getAllBookings,
  getBookingsStatus,
} from "../../features/bookings/bookingsSlice";
import { Booking } from "../../common/types";
import SingleBooking from "../SingleBooking/SingleBooking";
import { DEFAULT_PAGE_SIZE } from "../../common/constants";

const ListWithBookings: React.FC = () => {
  const dispatch = useAppDispatch();

  const effectRan = useRef(false);

  const bookings = useAppSelector(getAllBookings);
  const bookingsStatus = useAppSelector(getBookingsStatus);

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (effectRan.current === false) {
      if (bookingsStatus === "idle") {
        dispatch(
          fetchBookings({ pageIndex: currentPage, pageSize: DEFAULT_PAGE_SIZE })
        );
      }

      return () => {
        effectRan.current = true;
      };
    }
  }, [dispatch, bookingsStatus, currentPage]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (Math.ceil(scrollTop) + clientHeight === scrollHeight) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (currentPage > 0) {
      dispatch(
        fetchBookings({ pageIndex: currentPage, pageSize: DEFAULT_PAGE_SIZE })
      );
    }
  }, [dispatch, currentPage]);

  return (
    <section>
      {bookings.length > 0 &&
        bookings.map((booking: Booking) => (
          <SingleBooking key={booking.id} booking={booking} />
        ))}
    </section>
  );
};

export default ListWithBookings;
