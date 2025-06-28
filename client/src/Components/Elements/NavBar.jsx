import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import Button from "./Button";
import Header from "./Header";
import AuthPopup from "./AuthPop";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setShowHamburger(width >= 100 && width <= 1280);
      if (width > 1280) setIsOpen(false); // close menu if resized to desktop
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>    
    {showAuthPopup && (
      <AuthPopup onClose={() => setShowAuthPopup(false)} />
    )}
    <nav className="w-full bg-white shadow-md hover:bg-blue-50 transition duration-300 rounded-sm fixed top-0 z-40">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="flex items-center justify-between h-20 relative">
          {/* Header always visible */}
          <Header dark={false} />

          {/* Hamburger icon (top right) */}
          {showHamburger && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-700 z-20"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}

          {/* Desktop nav links: show only on xl+ (≥1280px) */}
          <div className="hidden xl:flex items-center space-x-6 ml-auto">
            <div className="flex space-x-6">
              <Link to="/memberportal" className="link">
                Member Portal
              </Link>
              <Link to="/project" className="link">
                Project
              </Link>
              <Link to="/calander" className="link">
                Calendar
              </Link>
              <Link to="/shop" className="link">
                Shop
              </Link>
              <Link to="/about" className="link">
                About
              </Link>
              <Link to="/leoai" className="link">
                Leo AI ✨
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button label="Log In" className="login" onClick={() => setShowAuthPopup(true)} />
              {/* <Button label="Donate" className="donate" /> */}
             <Link to="/donation">
              <Button label="Donate" className="donate" />
            </Link>

            </div>
          </div>
        </div>
       
      
        

        {/* Mobile dropdown menu: shows if open and hamburger visible */}
        {isOpen && showHamburger && (
          <div className="w-full bg-white rounded-md shadow-md mt-2 z-10">
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
                  onClick={() => setIsOpen(false)} // close menu on link click
                >
                  {label}
                </Link>
              ))}
              <div className="flex flex-col items-center space-y-2 p-4">
                <Button label="Log In" className="login w-full" onClick={() => setShowAuthPopup(true)}/>
                 
                <Button label="Donate" className="donate w-full"onClick={() => (window.location.href = '/donation')}/>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
    </>
  );
}

