import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { HotelsPage } from "./pages/HotelsPage";
import { WeatherPage } from "./pages/WeatherPage";
import { ActivitiesPage } from "./pages/ToursAndActivities";

function App() {
  

  return (
    <>
      <Header />
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<HotelsPage/>} path="/hotels"/>
        <Route element={<ActivitiesPage/>} path="/tours&activities"/>
        <Route element={<WeatherPage/>} path="/weather"/>
      </Routes>
    </>
  );
}

export default App;
