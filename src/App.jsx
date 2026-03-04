import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { HotelsPage } from "./pages/HotelsPage";

function App() {
  

  return (
    <>
      <Header />
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<HotelsPage/>} path="/hotels"/>
      </Routes>
    </>
  );
}

export default App;
