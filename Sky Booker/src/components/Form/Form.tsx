import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getAllAirports,
  getAirportsStatus,
} from "../../features/airports/airportsSlice";
import { fetchAirports } from "../../thunks/airports/fetchAirports";
import { Airport } from "../../common/types";
import AirportOption from "../AirportOption/AirportOption";
import {
  onInputChanged,
  onAirportChanged,
  onAddBookingClick,
} from "../../handlers/formHandlers";

const AddBookingForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const effectRan = useRef(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [departureAirports, setDepartureAirports] = useState<Airport[]>([]);
  const [destinationAirports, setDestinationAirports] = useState<Airport[]>([]);

  const [selectedDepartureAirportID, setSelectedDepartureAirportID] =
    useState(0);
  const [selectedDestinationAirportID, setSelectedDestinationAirportID] =
    useState(0);

  const [selectedDepartureAirport, setSelectedDepartureAirport] = useState("");
  const [selectedDestinationAirport, setSelectedDestinationAirport] =
    useState("");

  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const airports = useAppSelector(getAllAirports);
  const airportsStatus = useAppSelector(getAirportsStatus);

  useEffect(() => {
    if (effectRan.current === false) {
      if (airportsStatus === "idle") {
        dispatch(fetchAirports());
      }

      return () => {
        effectRan.current = true;
      };
    }
  }, [dispatch, airportsStatus]);

  useEffect(() => {
    setDepartureAirports(airports);
    setDestinationAirports(airports);
  }, [airports]);

  return (
    <section>
      <h2>Add New Booking</h2>
      <form>
        <label htmlFor="postTitle">Your First Name</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={firstName}
          onChange={(e) => onInputChanged(e, setFirstName)}
        />

        <label htmlFor="postTitle">Your Last Name</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={lastName}
          onChange={(e) => onInputChanged(e, setLastName)}
        />

        <label htmlFor="postTitle">Departure Airport</label>
        <select
          id="departureAirports"
          name="departureAirport"
          value={selectedDepartureAirport}
          onChange={(e) =>
            onAirportChanged(
              airports,
              e,
              setDestinationAirports,
              setSelectedDepartureAirport,
              setSelectedDepartureAirportID
            )
          }
        >
          <option value="" disabled>
            Select Departure Airport
          </option>
          {departureAirports.map((airport: Airport) => (
            <AirportOption key={airport.id} airport={airport} />
          ))}
        </select>

        <label htmlFor="postTitle">Destination Airport</label>
        <select
          id="destinationAirports"
          name="destinationAirport"
          value={selectedDestinationAirport}
          onChange={(e) =>
            onAirportChanged(
              airports,
              e,
              setDepartureAirports,
              setSelectedDestinationAirport,
              setSelectedDestinationAirportID
            )
          }
        >
          <option value="" disabled>
            Select Destination Airport
          </option>
          {destinationAirports.map((airport: Airport) => (
            <AirportOption key={airport.id} airport={airport} />
          ))}
        </select>

        <div>
          <label htmlFor="datePicker">Depart:</label>
          <input
            type="date"
            id="departDatePicker"
            name="departDatePicker"
            value={departureDate}
            onChange={(e) => onInputChanged(e, setDepartureDate)}
            min={new Date().toISOString().split("T")[0]}
          />

          <label htmlFor="datePicker">Return:</label>
          <input
            type="date"
            id="returnDatePicker"
            name="returnDatePicker"
            value={returnDate}
            onChange={(e) => onInputChanged(e, setReturnDate)}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        <div
          onClick={() =>
            onAddBookingClick(
              dispatch,
              firstName,
              lastName,
              selectedDepartureAirportID,
              selectedDestinationAirportID,
              departureDate,
              returnDate
            )
          }
        >
          Add Booking
        </div>
      </form>
    </section>
  );
};

export default AddBookingForm;
