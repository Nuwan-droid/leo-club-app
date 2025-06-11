import { useState } from "react";
import { Link } from "react-router-dom";
import {Button} from "./Button";
import logo from "../../assets/react.svg";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md hover:bg-blue-50 transition duration-300 p-4">
      <div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Heading */}
          <div className="flex items-center space-x-3">
            <img
              src={logo}
              alt="Club Logo"
              className="h-10 w-10 object-contain"
            />
            {/* Verical Line  */}
            <div className="w-1 h-20 bg-black rounded-sm"></div>

            <div className="flex flex-col text-left leading-tight">
              <span className="text-2xl  text-black">
                <b>LEO</b> CLUB OF
              </span>
              <span className="text-2xl  text-black">
                Uva Wellassa University
              </span>
            </div>
          </div>

          {/* Right side group: Navigation + Buttons */}
          <div className="hidden md:flex items-center space-x-8 text-center">
            {/* Navigation Links */}
            <div className="flex space-x-8">
               <Link to="/memberportal" className="link">Member Portal</Link>
               <Link to="/project" className="link">Project</Link>
               <Link to="/calander" className="link">Calendar</Link>
               <Link to="/shop" className="link">Shop</Link>
               <Link to="/about" className="link">About</Link>
               <Link to="/leoai" className="link">Leo AI ✨</Link>
              
          
              
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <Button label="Log In" className="login" />
              <Button label="Donate" className="donate" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isOpen && (
          <div className="md:hidden flex flex-col  space-y-6 py-4">
  <div className="flex flex-col items-center space-y-4">
    <Link to="/memberportal" className="link">Member Portal</Link>
    <Link to="/project" className="link">Project</Link>
    <Link to="/calander" className="link">Calendar</Link>
    <Link to="/shop" className="link">Shop</Link>
    <Link to="/about" className="link">About</Link>
    <Link to="/leoai" className="link">Leo AI ✨</Link>
  </div>

  <div className="flex flex-col  space-y-2 mt-4">
    <Button label="Log In" className="login" />
    <Button label="Donate" className="donate" />
  </div>
</div>

        )}
      </div>
    </nav>
  );
}

