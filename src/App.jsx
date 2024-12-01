import { Route, Routes } from "react-router-dom";
import Test from "./components/test";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Ranking from "./pages/Ranking";
import DetailProject from "./pages/DetailProject";
import PaymentResult from "./pages/PaymentResult";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/Administrator";
import Activities from "./pages/Activities";
import DetailActivity from "./pages/DetailActivity";
import FAQPage from "./pages/FAQPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId" element={<DetailProject />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/activities/:activityId" element={<DetailActivity />} />
        <Route path="/about" element={<About />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route
          path="/payment-result"
          element={<PaymentResult success={false} />}
        />
        <Route path="/administrator" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
