import { useEffect, useRef } from "react";
import "./App.css";
import Form from "./components/Form/Form";
import ListWithBookings from "./components/ListWithBookings/ListWithBookings";
import { fetchAirports } from "./thunks/airports/fetchAirports";
// import { fetchBookings } from "./thunks/bookings/fetchBookings";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { getAirportsStatus } from "./features/airports/airportsSlice";

function App() {
  const dispatch = useAppDispatch();

  const effectRan = useRef(false);
  const airportsStatus = useAppSelector(getAirportsStatus);
  useEffect(() => {
    if (effectRan.current === false) {
      if (airportsStatus === "idle") {
        const getAirports = async () => {
          await dispatch(fetchAirports());
        };

        getAirports();
      }

      return () => {
        effectRan.current = true;
      };
    }
  }, [dispatch, airportsStatus]);
  
  return (
    <>
      <Form />
      <ListWithBookings />
    </>
  );
}

export default App;
