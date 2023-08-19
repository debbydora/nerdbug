import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WeatherDetail from "./pages/WeatherDetail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/city-details/:cityName" element={<WeatherDetail />} />
      </Routes>
    </>
  );
}

export default App;
