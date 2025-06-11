import "@fortawesome/fontawesome-free/css/all.min.css";
import logo from "../../assets/react.svg";
import { useState } from "react";

export default function Footer() {
  const [value, setValue] = useState("");

  function handle(event) {
    setValue(event.target.value);
  }

  return (
    <footer className="bg-[#192847] text-white">
      <div className="max-w-8xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Top Section: Logo + Description + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-3 mb-6">
              <img
                src={logo}
                alt="Club Logo"
                className="h-10 w-10 object-contain"
              />
              <div className="w-1 h-20 bg-white rounded-sm"></div>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-2xl text-white font-bold">LEO CLUB OF</span>
                <span className="text-2xl text-white">Uva Wellassa University</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 w-full max-w-md">
              <input
                className="w-full bg-white border border-gray-600 rounded-md p-2"
                type="email"
                placeholder="Email Address"
                onChange={(event) => handle(event)}
                onMouseLeave={() => setValue("")}
              />
              <button className="bg-blue-600 hover:bg-[#0A3DAB] text-white font-bold py-2.5 px-4 rounded">
                ➤
              </button>
            </div>
            <p className="text-white text-sm mt-4">{value}</p>
            <p className="text-white text-sm mt-2 text-center md:text-left">
              Empowering your digital presence with intuitive design and seamless experience.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="flex flex-col items-center sm:items-start">
              <h3 className="text-white font-semibold mb-2">Product</h3>
              <ul className="space-y-1 text-sm text-gray-400">
                <li><a href="#">Autocapture</a></li>
                <li><a href="#">Data Governance</a></li>
                <li><a href="#">Virtual Events</a></li>
                <li><a href="#">Virtual Users</a></li>
                <li><a href="#">Behavioral Analytics</a></li>
                <li><a href="#">Connect</a></li>
              </ul>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <h3 className="text-white font-semibold mb-2">Explore</h3>
              <ul className="space-y-1 text-sm text-gray-400">
                <li><a href="#">Resources</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Documents</a></li>
              </ul>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <h3 className="text-white font-semibold mb-2">Company</h3>
              <ul className="space-y-1 text-sm text-gray-400">
                <li><a href="#">About us</a></li>
                <li><a href="#">Partners</a></li>
                <li><a href="#">Customer</a></li>
                <li><a href="#">Contact us</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-sm text-center text-gray-500">
          © 2025 Your Company. All rights reserved.
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center space-x-4 mt-2">
          <a href="#" className="social hover:text-white text-gray-400">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="social hover:text-white text-gray-400">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="social hover:text-white text-gray-400">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="social hover:text-white text-gray-400">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
