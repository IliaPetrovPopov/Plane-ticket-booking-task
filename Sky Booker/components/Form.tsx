import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../src/app/hooks";
import {
  getAllAirports,
  getStatus,
} from "../src/features/airports/airportsSlice";
import { fetchAirports } from "../src/thunks/airports/fetchAirports";
import { Airport } from "../common/types";

const AddBookingForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const effectRan = useRef(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [departureAirports, setDepartureAirports] = useState<Airport[]>([]);
  const [destinationAirports, setDestinationAirports] = useState<Airport[]>([]);

  const [selectedDepartureAirport, setSelectedDepartureAirport] = useState("");
  const [selectedDestinationAirport, setSelectedDestinationAirport] = useState("");

  // const [departureDate, setDepartureDate] = useState("");
  // const [dateOfReturn, setDateOfReturn] = useState("");

  const airports = useAppSelector(getAllAirports);
  const airportsStatus = useAppSelector(getStatus);

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

  const onFirstNameChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFirstName(e.target.value);

  const onLastNameChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLastName(e.target.value);

  const onDepartureAirportChanged = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedAirportCode = e.target.value;

    const remainingAirports = airports.filter(
      (airport: Airport) => airport.code !== selectedAirportCode
    );

    setDestinationAirports(remainingAirports);
    setSelectedDepartureAirport(selectedAirportCode);
  };

  const onDestinationAirportChanged = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedAirportCode = e.target.value;

    const remainingAirports = airports.filter(
      (airport: Airport) => airport.code !== selectedAirportCode
    );

    setDepartureAirports(remainingAirports);
    setSelectedDestinationAirport(selectedAirportCode);
  };

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
          onChange={onFirstNameChanged}
        />

        <label htmlFor="postTitle">Your Last Name</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={lastName}
          onChange={onLastNameChanged}
        />

        <label htmlFor="postTitle">Departure Airport</label>
        <select
          id="departureAirports"
          name="departureAirport"
          value={selectedDepartureAirport}
          onChange={onDepartureAirportChanged}
        >
          <option value="" disabled>
            Select Departure Airport
          </option>
          {departureAirports.map((airport: Airport) => (
            <option key={airport.id} value={airport.code}>
              {airport.title}
            </option>
          ))}
        </select>

        <label htmlFor="postTitle">Destination Airport</label>
        <select
          id="destinationAirports"
          name="destinationAirport"
          value={selectedDestinationAirport}
          onChange={onDestinationAirportChanged}
        >
          <option value="" disabled>
            Select Destination Airport
          </option>
          {destinationAirports.map((airport: Airport) => (
            <option key={airport.id} value={airport.code}>
              {airport.title}
            </option>
          ))}
        </select>

        <span>
          <label htmlFor="datePicker">Depart:</label>
          <input
            type="date"
            id="datePicker"
            name="datePicker"
            // value={selectedDate}
            // onChange={handleDateChange}
          />

          <label htmlFor="datePicker">Return:</label>
          <input
            type="date"
            id="datePicker"
            name="datePicker"
            // value={selectedDate}
            // onChange={handleDateChange}
          />
        </span>
      </form>
    </section>
  );
};

export default AddBookingForm;
