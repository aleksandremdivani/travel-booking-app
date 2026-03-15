import HomePage from "./pages/HomePage";
import { Route, Routes, useLocation } from "react-router-dom";
import { HotelsPage } from "./pages/HotelsPage";
import { WeatherPage } from "./pages/WeatherPage";
import { ActivitiesPage } from "./pages/ToursAndActivities";
import { ActivityDetailsPage } from "./pages/ActivityPage";
import { MainLayout } from "./layouts/MainLayout";
import { ActivitiesLayout } from "./layouts/ActivitiesLayout";
import { BookingPage } from "./pages/BookingPage";
import { MyBookings } from "./pages/MyBookings";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route element={<HomePage />} path="/" />
          <Route element={<HotelsPage />} path="/hotels" />
          <Route element={<ActivitiesPage />} path="/tours&activities" />
          <Route element={<WeatherPage />} path="/weather" />
          <Route element={<BookingPage/>} path="/booking"/>
          <Route element={<MyBookings/>} path="/bookings"/>
        </Route>
        <Route element={<ActivitiesLayout/>} path="/tours&activities/activity">
          <Route
          element={<ActivityDetailsPage />}
          path=":id"
        />
        </Route>
        
      </Routes>
    </>
  );
}

export default App;
