import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/Elements/NavBar";
import Footer from "./Components/Elements/Footer";
import Landing from "./Components/Pages/Landing";
import About from "./Components/Pages/About";
import PrivacyPolicy from "./Components/Pages/PrivacyPolicy";
import Terms from "./Components/Pages/Terms";
import Donation from "./Components/Pages/Donation";
import DonateMoney from "./Components/Pages/DonateMoney";
import DonateBooks from "./Components/Pages/DonateBook";
import EventCalendar from "./Components/Pages/EventCalendar";
import Shop from "./Components/Pages/LeoShop";
import ProjectShowcasePage from "./Components/Pages/ProjectShowcasePage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/donation" element={<Donation/>}/>
        <Route path="/donatemoney" element= {<DonateMoney/>}/>
        <Route path="/donatebook" element={<DonateBooks/>} />
        <Route path="calander" element={<EventCalendar />} />
        <Route path="shop" element={<Shop />} />
        <Route path="project" element={<ProjectShowcasePage />} />

      </Routes> 
      <Footer />
    </>
  );
}

export default App;