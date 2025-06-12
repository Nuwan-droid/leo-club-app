import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import Header from "./Header";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md hover:bg-blue-50 transition duration-300 rounded-sm">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="flex items-center justify-between h-20">
          {/* Header always visible */}
          <Header dark={false} />

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-6">
              <Link to="/memberportal" className="link">Member Portal</Link>
              <Link to="/project" className="link">Project</Link>
              <Link to="/calander" className="link">Calendar</Link>
              <Link to="/shop" className="link">Shop</Link>
              <Link to="/about" className="link">About</Link>
              <Link to="/leoai" className="link">Leo AI ✨</Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button label="Log In" className="login" />
              <Button label="Donate" className="donate" />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none p-2"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu (below header) */}
        {isOpen && (
          <div className="md:hidden w-full bg-white rounded-md shadow-md mt-2 z-10">
            <div className="flex flex-col divide-y divide-gray-200">
              {[
                { label: "Member Portal", to: "/memberportal" },
                { label: "Project", to: "/project" },
                { label: "Calendar", to: "/calander" },
                { label: "Shop", to: "/shop" },
                { label: "About", to: "/about" },
                { label: "Leo AI ✨", to: "/leoai" },
              ].map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className="link w-full px-4 py-3 text-center hover:bg-blue-100"
                >
                  {label}
                </Link>
              ))}
              <div className="flex flex-col items-center space-y-2 p-4">
                <Button label="Log In" className="login w-full" />
                <Button label="Donate" className="donate w-full" />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
