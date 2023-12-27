import { Airport } from "../common/types";

export const onNameChanged = (
  setCertainState: React.Dispatch<React.SetStateAction<string>>,
  e: React.ChangeEvent<HTMLInputElement>
) => setCertainState(e.target.value);

export const onAirportChanged = (
  airports: Airport[],
  e: React.ChangeEvent<HTMLSelectElement>,
  setAirports: React.Dispatch<React.SetStateAction<Airport[]>>,
  setSelectedAirport: React.Dispatch<React.SetStateAction<string>>
) => {
  const selectedAirportCode = e.target.value;

  const remainingAirports = airports.filter(
    (airport: Airport) => airport.code !== selectedAirportCode
  );

  setAirports(remainingAirports);
  setSelectedAirport(selectedAirportCode);
};
