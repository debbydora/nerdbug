import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Layout from "./components/Layout/Layout";
import WeatherDetail from "./pages/WeatherDetail";
import CurrentWeatherCard from "./components/CityWeatherItem";
import { expect } from "vitest";

// A component that wraps the Layout and Route
const LayoutRouteWrapper = ({ children }) => (
  <Layout>
    <Routes>
      <Route path="/" element={<App />} />
      {children}
    </Routes>
  </Layout>
);

describe("App", () => {
  it("App contains home components", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const component1 = screen.getByTestId("home");

    expect(component1).toBeInTheDocument();

    // const message = screen.queryByText(/Hello world/i);
    // expect(message).toBeInTheDocument();
  });

  it("App contains Weather detail component", () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/city-details/lagos"]}>
        <LayoutRouteWrapper>
          <Route
            path="/city-details/:cityName"
            element={<WeatherDetail data-testid="details" />}
          />
        </LayoutRouteWrapper>
      </MemoryRouter>
    );

    const weatherDetailComponent = getByTestId("details");
    expect(weatherDetailComponent).toBeInTheDocument();
  });

  it("renders view", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <CurrentWeatherCard />
      </MemoryRouter>
    );
    const view = getByTestId("view");
    expect(view).toBeInTheDocument();
  });

  it("CurrentWeatherCard navigates to weatherDetail with data(latitude) and Texarea", async () => {
    render(
      <MemoryRouter>
        <CurrentWeatherCard />
        <WeatherDetail />
      </MemoryRouter>
    );
    const viewButton = screen.getByTestId("view");
    fireEvent.click(viewButton);

    // Wait for the WeatherDetail component to load (adjust selector as needed)
    await waitFor(() => screen.getByTestId("weather-detail-textarea"));
    await waitFor(() => screen.getByTestId("temp"));

    // Assert that the TextArea is present
    const textArea = screen.getByTestId("weather-detail-textarea");
    const span = screen.getByTestId("temp");
    expect(textArea).toBeInTheDocument();
    expect(span).toBeInTheDocument();
  });
});
