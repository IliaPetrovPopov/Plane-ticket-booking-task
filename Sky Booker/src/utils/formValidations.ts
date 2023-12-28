import { EMPTY_INPUT, DEFAULT_AIRPORT_ID } from "../common/constants";
import { errorMessages } from "../common/errors";

export const isInputValid = (
  firstName: string,
  lastName: string,
  departureDate: string,
  returnDate: string
) => {
  if (firstName === EMPTY_INPUT || lastName === EMPTY_INPUT) {
    throw new Error(errorMessages.emptyNameInput);
  }

  if (departureDate === EMPTY_INPUT || returnDate === EMPTY_INPUT) {
    throw new Error(errorMessages.emptyDateInput);
  }

  return true;
};

export const isAirportEntered = (
  departureAirportId: number,
  arrivalAirportId: number
) => {
  if (
    departureAirportId === DEFAULT_AIRPORT_ID ||
    arrivalAirportId === DEFAULT_AIRPORT_ID
  ) {
    throw new Error(errorMessages.noAirportSelected);
  }

  return true;
};
