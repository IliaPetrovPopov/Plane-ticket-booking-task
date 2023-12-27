import { useAppDispatch } from "../app/hooks";
import { Airport, AppDispatch } from "../common/types";
import { postBooking } from "../thunks/bookings/postBooking";

export const onInputChanged = (
  e: React.ChangeEvent<HTMLInputElement>,
  setState: React.Dispatch<React.SetStateAction<string>>
) => setState(e.target.value);

export const onAirportChanged = (
  airports: Airport[],
  e: React.ChangeEvent<HTMLSelectElement>,
  setAirports: React.Dispatch<React.SetStateAction<Airport[]>>,
  setSelectedAirport: React.Dispatch<React.SetStateAction<string>>,
  setSelectedAirportID: React.Dispatch<React.SetStateAction<number>>
) => {
  const selectedAirportCode = e.target.value;

  const remainingAirports = airports.filter((airport: Airport) => {
    if (airport.code === selectedAirportCode) {
      setSelectedAirportID(airport.id);
      return false;
    }

    return true;
  });

  setAirports(remainingAirports);
  setSelectedAirport(selectedAirportCode);
};

export const onAddBookingClick = async (
  // e: React.MouseEvent<HTMLDivElement>,
  dispatch: AppDispatch,
  firstName: string,
  lastName: string,
  departureAirportId: number,
  arrivalAirportId: number,
  departureDate: string,
  returnDate: string
) => {
  const bookingData = {
    firstName,
    lastName,
    departureAirportId,
    arrivalAirportId,
    departureDate,
    returnDate,
  };

  const createNewPost = await dispatch(postBooking(bookingData));

  console.log(createNewPost);
  
};
