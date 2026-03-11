import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { HotelsPage } from "./pages/HotelsPage";
import { WeatherPage } from "./pages/WeatherPage";
import { FlightsPage } from "./pages/FlightsPage";

function App() {
  

  return (
    <>
      <Header />
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<HotelsPage/>} path="/hotels"/>
        <Route element={<FlightsPage/>} path="/flights"/>
        <Route element={<WeatherPage/>} path="/weather"/>
      </Routes>
    </>
  );
}

export default App;
