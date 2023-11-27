import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Forecast from "./components/Forecast";
import HourlyForecast from "./components/HourlyForecast";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Forecast />} />
          <Route path="/:day" element={<HourlyForecast />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
