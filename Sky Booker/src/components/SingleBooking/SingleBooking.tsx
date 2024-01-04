import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getSpecificAirportTitle } from "../../features/airports/airportsSlice";
import { Booking, RootState } from "../../common/types";
import { onDeleteBookingClick } from "../../handlers/listHandlers";
import { formatDate } from "../../utils/dateFormatting";
import "./SingleBooking.css";

interface SingleBookingProps {
  booking: Booking;
}

const SingleBooking: React.FC<SingleBookingProps> = ({ booking }) => {
  const dispatch = useAppDispatch();

  const departureAirport = useAppSelector((state: RootState) =>
    getSpecificAirportTitle(state, booking?.departureAirportId)
  );

  const arrivalAirport = useAppSelector((state: RootState) =>
    getSpecificAirportTitle(state, booking?.arrivalAirportId)
  );

  const departureAirportTitle = departureAirport
    ? departureAirport?.title
    : "Unknown";
  const arrivalAirportTitle = arrivalAirport
    ? arrivalAirport?.title
    : "Unknown";

  return (
    <div id="single-booking" data-testid="single-booking">
      <br />
      <span className="booking-info">
        Booked by: {booking?.firstName} {booking?.lastName}
      </span>
      <span className="booking-info">
        {" "}
        Departures from: {departureAirportTitle}
      </span>
      <span className="booking-info"> Arrives at: {arrivalAirportTitle}</span>
      <span className="booking-info">
        {" "}
        Departure date: {formatDate(booking?.departureDate)}
      </span>
      <span className="booking-info">
        {" "}
        Return date: {formatDate(booking?.returnDate)}
      </span>
      <button
        className="delete-button"
        onClick={() => onDeleteBookingClick(dispatch, booking)}
      >
        {" "}
        Delete
      </button>
    </div>
  );
};

export default SingleBooking;
