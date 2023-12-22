import { useState } from "react";
import "./Form.css";

const Form = () => {
  const [tour, setTour] = useState("");

  const onFetch = async () => {
    const data = await fetch(
      "https://interview.fio.de/core-frontend/api/airports?authToken=gsSDI5RkyZAE2cymDputZramTBW8ko"
    );
    const result = await data.json();
    console.log(result);
  };

  const createNewBooking = () => {};

  const retrieveExistingBookings = () => {
    fetch(
      "https://interview.fio.de/core-frontend/api/bookings?authToken=gsSDI5RkyZAE2cymDputZramTBW8ko"
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  return (
    <div id="ticket-booking-wrapper">
      <div id="ticket-form">
        <div>Create New Tour</div>
        <input type="text" onChange={(e) => setTour(e.target.value)} />
        <button onClick={retrieveExistingBookings}> Here </button>
      </div>
    </div>
  );
};

export default Form;
