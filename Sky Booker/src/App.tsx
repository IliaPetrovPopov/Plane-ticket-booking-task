import { useEffect, useState } from "react";
import "./App.css";
import Form from "../components/Form"

function App() {
  const [airports, setAirports] = useState([]);

  return (
    <>
      <Form />
    </>
  );
}

export default App;
