import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from "./Header";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#192847] text-white w-full">
      <div className="w-full px-8 py-12 sm:px-12 lg:px-20">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row gap-12 mb-12">
          {/* Left: Header + Description + Social Icons */}
          <div className="flex flex-col items-center lg:items-start lg:w-1/2">
            {/* Header centered on all screens */}
            <div className="w-full flex justify-center lg:justify-start">
              <Header dark={true} />
            </div>

            {/* Social Icons + Terms/Privacy */}
            <div className="mt-4 flex flex-col items-center">
              <div className="flex space-x-6 m-2">
                <a href="#" className="hover:text-white text-gray-400">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="hover:text-white text-gray-400">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="hover:text-white text-gray-400">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="hover:text-white text-gray-400">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>

              <div className="flex gap-8 mt-4">
                <Link to="/terms" className="text-[gray] text-lg hover:text-white">
                  Terms
                </Link>
                <Link to="/privacy-policy" className="text-[gray] text-lg hover:text-white">
                  Privacy
                </Link>
              </div>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden lg:block w-px bg-gray-600"></div>

          {/* Right: Navigation Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center lg:w-1/2">
            <div>
              <ul className="space-y-1 text-sm text-gray-400">
                <li><Link to="/memberportal" className="shortlink">Member Portal</Link></li>
                <li><Link to="/learninghub" className="shortlink">Learning Hub</Link></li>
                <li><Link to="/newsletter" className="shortlink">Newsletter</Link></li>
                <li><Link to="/event-volunteer" className="shortlink">Event Volunteer</Link></li>
              </ul>
            </div>
            <div>
              <ul className="space-y-1 text-sm text-gray-400">
                <li><Link to="/project" className="shortlink">Projects</Link></li>
                <li><Link to="/calander" className="shortlink">Calendar</Link></li>
                <li><Link to="/shop" className="shortlink">Shop</Link></li>
                <li><Link to="/about" className="shortlink">About</Link></li>
              </ul>
            </div>
            <div>
              {/* You can add more sections here if needed */}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-sm text-center text-gray-500">
          <p className="text-white text-lg">
            LEO Club of Uva Wellassa University, Passara Road, Badulla
          </p>
          {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
