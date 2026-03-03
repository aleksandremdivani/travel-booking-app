import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";

function App() {
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("");
    };
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route element={<HomePage/>} path="/"/>
      </Routes>
    </>
  );
}

export default App;
