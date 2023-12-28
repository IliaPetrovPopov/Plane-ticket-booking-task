import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getSpecificAirportTitle,
} from "../../features/airports/airportsSlice";
import { Booking } from "../../common/types";
import { onDeleteBookingClick } from "../../handlers/listHandlers";
import { formatDate } from "../../utils/dateFormatting";

interface SingleBookingProps {
  booking: Booking;
}

const SingleBooking: React.FC<SingleBookingProps> = ({ booking }) => {
  const dispatch = useAppDispatch();

  const departureAirport = useAppSelector((state) =>
    getSpecificAirportTitle(state, booking?.departureAirportId)
  );

  const arrivalAirport = useAppSelector((state) =>
    getSpecificAirportTitle(state, booking?.arrivalAirportId)
  );

  const departureAirportTitle = departureAirport ? departureAirport?.title : 'Unknown';
  const arrivalAirportTitle = arrivalAirport ? arrivalAirport?.title : 'Unknown';

  return (
    <div>
      <br />
      <span>
        Booked by: {booking?.firstName} {booking?.lastName} |
      </span>
      <span> Departures from: {departureAirportTitle} | </span>
      <span> Arrives at: {arrivalAirportTitle} | </span>
      <span> Departure date: {formatDate(booking?.departureDate)} |</span>
      <span> Return date: {formatDate(booking?.returnDate)} | </span>
      <button><i className="fa-solid fa-skull-crossbones fa-lg" onClick={(() => onDeleteBookingClick(dispatch, booking))}></i></button>
    </div>
  );
};

export default SingleBooking;
