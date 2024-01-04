import Form from "../components/Form/Form";
import { renderWithProviders } from "../utils/test-utils";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";
import { handlers } from "../test/handlers";
import ListWithBookings from "../components/ListWithBookings/ListWithBookings";

describe("Form component", () => {
  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should render the Form component", () => {
    renderWithProviders(<Form />);

    expect(screen.getByText("Add New Booking")).not.toBeNull();
    expect(screen.getByLabelText("Your First Name:")).not.toBeNull();
    expect(screen.getByLabelText("Your Last Name:")).not.toBeNull();
    expect(screen.getByLabelText("Departure Airport:")).not.toBeNull();
    expect(screen.getByLabelText("Destination Airport:")).not.toBeNull();
  });

  it("should handle first name input changes", () => {
    renderWithProviders(<Form />);

    const firstNameInput = screen.getByLabelText(
      "Your First Name:"
    ) as HTMLInputElement;

    fireEvent.change(firstNameInput, { target: { value: "John" } });

    expect(firstNameInput.value).toBe("John");
  });

  it("should handle last name input changes", () => {
    renderWithProviders(<Form />);

    const lastNameInput = screen.getByLabelText(
      "Your Last Name:"
    ) as HTMLInputElement;

    fireEvent.change(lastNameInput, { target: { value: "Doe" } });

    expect(lastNameInput.value).toBe("Doe");
  });

  it("should handle departure airport selection changes", () => {
    renderWithProviders(<Form />);

    const departureAirportSelect = screen.getByLabelText(
      "Departure Airport:"
    ) as HTMLSelectElement;

    fireEvent.change(departureAirportSelect, { target: { value: "TBS" } });

    expect(departureAirportSelect.value).toBe("TBS");
  });

  it("should handle destination airport selection changes", () => {
    renderWithProviders(<Form />);

    const destinationAirportSelect = screen.getByLabelText(
      "Destination Airport:"
    ) as HTMLSelectElement;

    fireEvent.change(destinationAirportSelect, { target: { value: "TBS" } });

    expect(destinationAirportSelect.value).toBe("TBS");
  });

  it("should handle change in depart date's value", () => {
    renderWithProviders(<Form />);

    const departDate = screen.getByLabelText("Depart:") as HTMLInputElement;

    fireEvent.change(departDate, { target: { value: "2024-12-29" } });

    expect(departDate.value).toBe("2024-12-29");
  });

  it("should handle change in return date's value", () => {
    renderWithProviders(<Form />);

    const returnDate = screen.getByLabelText("Return:") as HTMLInputElement;

    fireEvent.change(returnDate, { target: { value: "2024-12-29" } });

    expect(returnDate.value).toBe("2024-12-29");
  });

  it("should create & display a booking on button click", async () => {
    renderWithProviders(<Form />);

    const firstNameInput = screen.getByLabelText(
      "Your First Name:"
    ) as HTMLInputElement;

    const lastNameInput = screen.getByLabelText(
      "Your Last Name:"
    ) as HTMLInputElement;

    const departureAirportSelect = screen.getByLabelText(
      "Departure Airport:"
    ) as HTMLSelectElement;

    const destinationAirportSelect = screen.getByLabelText(
      "Destination Airport:"
    ) as HTMLSelectElement;

    const departDate = screen.getByLabelText("Depart:") as HTMLInputElement;

    const returnDate = screen.getByLabelText("Return:") as HTMLInputElement;

    const addBooking = screen.getByText("Add Booking");

    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    fireEvent.change(departureAirportSelect, { target: { value: "TBS" } });
    fireEvent.change(destinationAirportSelect, { target: { value: "IBZ" } });
    fireEvent.change(departDate, { target: { value: "2024-12-29" } });
    fireEvent.change(returnDate, { target: { value: "2024-12-29" } });

    await waitFor(() => {
      fireEvent.click(addBooking);
    });

    expect(firstNameInput.value).toBe("");
    expect(lastNameInput.value).toBe("");
    expect(departureAirportSelect.value).toBe("");
    expect(destinationAirportSelect.value).toBe("");
    expect(departDate.value).toBe("");
    expect(returnDate.value).toBe("");

      renderWithProviders(<ListWithBookings />);
  
      const bookingComponent = screen.getByTestId("single-booking");
  
      expect(bookingComponent).toBeInTheDocument();
  
      expect(bookingComponent.textContent).toBe("Booked by: Alexis Doe Departures from: Tbilisi International Airport Arrives at: Ibiza Airport Departure date: 29-12-2024 Return date: 30-12-2024 Delete");
  });
});
