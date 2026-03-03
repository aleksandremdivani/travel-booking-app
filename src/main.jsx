import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { DestinationsProvider } from "./context/DestinationsContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <DestinationsProvider>
      <App />
    </DestinationsProvider>
  </BrowserRouter>,
);
