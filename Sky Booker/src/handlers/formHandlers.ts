import { Airport, AppDispatch } from "../common/types";
import { postBooking } from "../thunks/bookings/postBooking";
import { isAirportEntered, isInputValid } from "../utils/formValidations";

export const onInputChanged = (
  e: React.ChangeEvent<HTMLInputElement>,
  setState: React.Dispatch<React.SetStateAction<string>>
) => setState(e?.target?.value);

export const onAirportChanged = (
  airports: Airport[],
  e: React.ChangeEvent<HTMLSelectElement>,
  setAirports: React.Dispatch<React.SetStateAction<Airport[]>>,
  setSelectedAirport: React.Dispatch<React.SetStateAction<string>>,
  setSelectedAirportID: React.Dispatch<React.SetStateAction<number>>
) => {
  const selectedAirportCode = e.target.value;

  const remainingAirports = airports.filter((airport: Airport) => {
    if (airport?.code === selectedAirportCode) {
      setSelectedAirportID(airport?.id);
      return false;
    }

    return true;
  });

  setAirports(remainingAirports);
  setSelectedAirport(selectedAirportCode);
};

export const onDepartureDateChanged = (
  e: React.ChangeEvent<HTMLInputElement>,
  returnDate: string,
  setDepartureDate: React.Dispatch<React.SetStateAction<string>>,
  setReturnDate: React.Dispatch<React.SetStateAction<string>>
) => {
  const selectedDepartureDate = e?.target?.value;
  setDepartureDate(selectedDepartureDate);

  if (returnDate && returnDate < selectedDepartureDate) {
    setReturnDate(selectedDepartureDate);
  }
};

export const onReturnDateChanged = (
  e: React.ChangeEvent<HTMLInputElement>,
  departureDate: string,
  setDepartureDate: React.Dispatch<React.SetStateAction<string>>,
  setReturnDate: React.Dispatch<React.SetStateAction<string>>
) => {
  const selectedReturnDate = e?.target?.value;
  setReturnDate(selectedReturnDate);

  if (departureDate && departureDate > selectedReturnDate) {
    setDepartureDate(selectedReturnDate);
  }
};

export const onAddBookingClick = async (
  dispatch: AppDispatch,
  firstName: string,
  lastName: string,
  departureAirportId: number,
  arrivalAirportId: number,
  departureDate: string,
  returnDate: string,
  successCallback: () => void
) => {
  
  isInputValid(firstName, lastName, departureDate, returnDate);
  isAirportEntered(departureAirportId, arrivalAirportId);

  const bookingData = {
    firstName,
    lastName,
    departureAirportId,
    arrivalAirportId,
    departureDate,
    returnDate,
  };

  await dispatch(postBooking(bookingData))?.unwrap();

  successCallback();
};
