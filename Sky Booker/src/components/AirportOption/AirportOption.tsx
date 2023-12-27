import React from "react";
import { Airport } from "../../common/types";

interface AirportOptionProps {
  airport: Airport;
}

const AirportOption: React.FC<AirportOptionProps> = ({ airport }) => {
  return (
    <option value={airport.code}>
      {airport.title}
    </option>
  );
};

export default AirportOption;
