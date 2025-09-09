
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import NavBar from "./Components/Elements/NavBar";
import Footer from "./Components/Elements/Footer";
import Landing from "./Components/Pages/Landing";
import About from "./Components/Pages/About";
import PrivacyPolicy from "./Components/Pages/PrivacyPolicy";
import Terms from "./Components/Pages/Terms";
import Donation from "./Components/Pages/Donation";
import DonateMoney from "./Components/Pages/DonateMoney";
import DonateBooks from "./Components/Pages/DonateBook";
import DonateItems from "./Components/Pages/DonateItems";
import EventCalendar from "./Components/Pages/EventCalendar";
import Shop from "./Components/Pages/LeoShop";
import ProjectShowcasePage from "./Components/Pages/ProjectShowcasePage";
import MemberPortal from "./Components/Pages/memberportal/memberportal";
import LearningHub from "./Components/Pages/learninghub/learninghub";
import EventVolunteerPage from "./Components/Pages/event_volunteer/EventVolunteerPage";
import NewsLetter from "./Components/Pages/NewsLetter";
import Chatbot from "./Components/Pages/chatbot/LeoChatbot";
import Admin from "./Components/Pages/admin panel/main_admin";
import AccountManage from "./Components/Pages/memberportal/accountManagement/account";
import Membernotification from "./Components/Pages/memberportal/Notification/request";


function App() {
  const location = useLocation();

  // Check if current path is member portal or admin
  const isMemberPortal = location.pathname.startsWith("/memberportal");
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {!isMemberPortal && !isAdmin && <NavBar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/donatemoney" element={<DonateMoney />} />
        <Route path="/donatebook" element={<DonateBooks />} />
        <Route path="/donateitems/:projectId" element={<DonateItems />} />
        <Route path="/calander" element={<EventCalendar />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/project" element={<ProjectShowcasePage />} />
        <Route path="/memberportal" element={<MemberPortal />} />
        <Route path="/memberportal/learning-hub" element={<LearningHub />} />
        <Route path="/memberportal/join-newsletter" element={<NewsLetter />} />
        <Route path="/memberportal/event-volunteer" element={<EventVolunteerPage />} />
        <Route path="/memberportal/account-manage" element={<AccountManage/>} />
        <Route path="/memberportal/notifications" element={<Membernotification/>} />
        <Route path="/chatbot" element={<Chatbot />} />
        {/* Admin routes - use wildcard to handle nested routing */}
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
      {!isAdmin && <Footer />}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="light"
      />
      <Chatbot />
    </>
  );
}


export default App;

