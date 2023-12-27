import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getAllAirports,
  getStatus,
} from "../../features/airports/airportsSlice";
import { fetchAirports } from "../../thunks/airports/fetchAirports";
import { Airport } from "../../common/types";
import AirportOption from "../AirportOption/AirportOption";
import { onAirportChanged, onNameChanged } from "../../handlers/formHandlers";

const AddBookingForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const effectRan = useRef(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [departureAirports, setDepartureAirports] = useState<Airport[]>([]);
  const [destinationAirports, setDestinationAirports] = useState<Airport[]>([]);

  const [selectedDepartureAirport, setSelectedDepartureAirport] = useState("");
  const [selectedDestinationAirport, setSelectedDestinationAirport] =
    useState("");

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
          onChange={(e) =>
            onNameChanged(
              setFirstName,
              e,
            )
          }
        />

        <label htmlFor="postTitle">Your Last Name</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={lastName}
          onChange={(e) =>
            onNameChanged(
              setLastName,
              e,
            )
          }
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
              setSelectedDepartureAirport
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
              setSelectedDestinationAirport
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
