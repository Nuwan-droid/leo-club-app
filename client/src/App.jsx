import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/Elements/NavBar";
import Footer from "./Components/Elements/Footer";
import Landing from "./Components/Pages/Landing";
import About from "./Components/Pages/About";
import PrivacyPolicy from "./Components/Pages/PrivacyPolicy";
import Terms from "./Components/Pages/Terms";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;