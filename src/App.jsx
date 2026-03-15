import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { ActivitiesLayout } from "./layouts/ActivitiesLayout";

const HomePage = lazy(() => import("./pages/HomePage"));
const HotelsPage = lazy(() => import("./pages/HotelsPage").then(module => ({ default: module.HotelsPage })));
const WeatherPage = lazy(() => import("./pages/WeatherPage").then(module => ({ default: module.WeatherPage })));
const ActivitiesPage = lazy(() => import("./pages/ToursAndActivities").then(module => ({ default: module.ActivitiesPage })));
const ActivityDetailsPage = lazy(() => import("./pages/ActivityPage").then(module => ({ default: module.ActivityDetailsPage })));
const BookingPage = lazy(() => import("./pages/BookingPage").then(module => ({ default: module.BookingPage })));
const MyBookings = lazy(() => import("./pages/MyBookings").then(module => ({ default: module.MyBookings })));

const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-gray-50">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route element={<HomePage />} path="/" />
          <Route element={<HotelsPage />} path="/hotels" />
          <Route element={<ActivitiesPage />} path="/tours&activities" />
          <Route element={<WeatherPage />} path="/weather" />
          <Route element={<BookingPage />} path="/booking" />
          <Route element={<MyBookings />} path="/bookings" />
        </Route>
        
        <Route element={<ActivitiesLayout />} path="/tours&activities/activity">
          <Route element={<ActivityDetailsPage />} path=":id" />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;