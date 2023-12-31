import App from "../App";
import { it } from "vitest";
import { renderWithProviders } from "../utils/test-utils";
import { handlers } from "../test/handlers";
import { setupServer } from "msw/node";
import { screen } from "@testing-library/react";


describe("App component", () => {
  const server = setupServer(...handlers);

  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it("Should render the App component", () => {
    renderWithProviders(<App />);
    expect(screen.getByText(/Add New Booking/i)).not.toBeNull();
  });
});
