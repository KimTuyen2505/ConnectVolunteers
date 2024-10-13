import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Header from "./layouts/Header.jsx";
import Footer from "./layouts/Footer.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <App />
      </main>
      <Footer />
    </div>
  </BrowserRouter>
);
