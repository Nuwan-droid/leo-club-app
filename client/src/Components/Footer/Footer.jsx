import "@fortawesome/fontawesome-free/css/all.min.css";
import logo from "../../assets/react.svg";
import { useState } from "react";
export default function FooterDark() {
  const [value, setValue] = useState("");

  function handle(event) {
    setValue(event.target.value);
  }

  return (
    <footer className="bg-[#192847] text-white">
      <div className="max-w-8xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Logo + Description */}
          <div>
            <div className="flex items-center space-x-3">
              <img
                src={logo}
                alt="Club Logo"
                className="h-10 w-10 object-contain"
              />
              {/* Verical Line  */}
              <div className="w-1 h-20 bg-[white] rounded-sm"></div>

              <div className="flex flex-col text-left leading-tight">
                <span className="text-2xl  text-[white]">
                  <b>LEO</b> CLUB OF
                </span>
                <span className="text-2xl  text-[white]">
                  Uva Wellassa University
                </span>
              </div>
            </div>
            <input
              className="w-80 bg-[white-smoke] border border-gray-600 rounded-md p-2 mb-2 my-10 margin-bottom-10"
              type="email"
              placeholder="Email Address"
              onChange={(event) => handle(event) }
              onMouseLeave={() => setValue("")}
            />
            <button className="bg-[blue] hover:bg-[#0A3DAB] text-white font-bold py-2.5 px-4 rounded m-1 ">
              ➤
            </button>
            <p className="text-white text-sm">{value} </p>

            <p className="text-White text-sm mt-4">
              Empowering your digital presence with intuitive design and
              seamless experience.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex justify-space-between sm:justify-around ">
            <div>
              <h3>Product</h3>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>
                  <a href="#" >
                    Autocapture
                  </a>
                </li>
                <li>
                  <a href="#" >
                    Data Governance
                  </a>
                </li>
                <li>
                  <a href="#" >
                    Virtual Events
                  </a>
                </li>
                <li>
                  <a href="#" >
                    Virtual Users
                  </a>
                </li>
                <li>
                  <a href="#" >
                    Behavioral Analytics
                  </a>
                </li>
                <li>
                  <a href="#" >
                    Connect
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3>Explore</h3>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>
                  <a href="#" >
                    Resources
                  </a>
                </li>
                <li>
                  <a href="#" >
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" >
                    Documents
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3>Company</h3>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>
                  <a href="#" >
                    About us
                  </a>
                </li>
                <li>
                  <a href="#" >
                    Partners
                  </a>
                </li>
                <li>
                  <a href="#" >
                    Customer
                  </a>
                </li>
                <li>
                  <a href="#" >
                    Contact us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Icons */}
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-sm text-center text-gray-500">
          © 2025 Your Company. All rights reserved.
        </div>
        <div className="flex items-center justify-center space-x-4 mt-2">
          <a href="#" className="social">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="social">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="social">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
