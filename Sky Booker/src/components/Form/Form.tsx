import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAllAirports } from "../../features/airports/airportsSlice";
import { Airport } from "../../common/types";
import AirportOption from "../AirportOption/AirportOption";
import {
  onInputChanged,
  onAirportChanged,
  onAddBookingClick,
  onDepartureDateChanged,
  onReturnDateChanged,
} from "../../handlers/formHandlers";
import "./Form.css";

const AddBookingForm: React.FC = () => {
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    setDepartureAirports(airports);
    setDestinationAirports(airports);
  }, [airports]);

  return (
    <section className="add-booking-form">
      <h2 id="add-new-booking-title">Add New Booking</h2>
      <form>
        <div className="form-row">
          <div className="label-column">
            <label htmlFor="firstName">Your First Name:</label>
          </div>
          <div className="input-column">
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => onInputChanged(e, setFirstName)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="label-column">
            <label htmlFor="lastName">Your Last Name:</label>
          </div>
          <div className="input-column">
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => onInputChanged(e, setLastName)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="label-column">
            <label htmlFor="departDatePicker">Depart:</label>
          </div>
          <div className="input-column">
            <input
              type="date"
              className="date-pickers"
              id="departDatePicker"
              name="departDatePicker"
              value={departureDate}
              onKeyDown={(e) => e.preventDefault()}
              onChange={(e) =>
                onDepartureDateChanged(
                  e,
                  returnDate,
                  setDepartureDate,
                  setReturnDate
                )
              }
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="label-column">
            <label htmlFor="returnDatePicker">Return:</label>
          </div>
          <div className="input-column">
            <input
              type="date"
              className="date-pickers"
              id="returnDatePicker"
              name="returnDatePicker"
              value={returnDate}
              onChange={(e) =>
                onReturnDateChanged(
                  e,
                  departureDate,
                  setDepartureDate,
                  setReturnDate
                )
              }
              onKeyDown={(e) => e.preventDefault()}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="label-column">
            <label htmlFor="departureAirport">Departure Airport:</label>
          </div>
          <div className="input-column">
            <select
              id="departureAirport"
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
          </div>
        </div>

        <div className="form-row">
          <div className="label-column">
            <label htmlFor="destinationAirport">Destination Airport:</label>
          </div>
          <div className="input-column">
            <select
              id="destinationAirport"
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
          </div>
        </div>

        <button
          id="add-booking-button"
          type="button"
          onClick={() => {
            onAddBookingClick(
              dispatch,
              firstName,
              lastName,
              selectedDepartureAirportID,
              selectedDestinationAirportID,
              departureDate,
              returnDate,
              () => {
                setFirstName("");
                setLastName("");
                setSelectedDepartureAirportID(0);
                setSelectedDestinationAirportID(0);
                setSelectedDepartureAirport("");
                setSelectedDestinationAirport("");
                setDepartureDate("");
                setReturnDate("");
              }
            );
          }}
        >
          Add Booking
        </button>
      </form>
    </section>
  );
};

export default AddBookingForm;
