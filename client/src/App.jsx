import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/Elements/NavBar";
import Footer from "./Components/Elements/Footer";
import Landing from "./Components/Pages/Landing";
import ProjectShowcasePage from "./Components/Pages/ProjectShowcasePage";
import EventCalendar from "./Components/Pages/EventCalendar";
import LeoShop from "./Components/Pages/LeoShop"

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/project" element={<ProjectShowcasePage />} />
        <Route path="/calendar" element={<EventCalendar />} />
        <Route path="/shop" element={<LeoShop />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
