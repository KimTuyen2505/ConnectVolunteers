import { Route, Routes } from "react-router-dom";
import Test from "./components/test";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Ranking from "./pages/Ranking";  

function App() {
  return (
    <>
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/ranking" element={<Ranking />} />
      
      </Routes>
    </>
  );
}

export default App;
