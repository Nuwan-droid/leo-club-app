import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/Elements/NavBar";
import Footer from "./Components/Elements/Footer";
import Landing from "./Components/Pages/Landing";

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Landing />} />
       
      </Routes>

      <Footer />
    </>
  );
}

export default App;
