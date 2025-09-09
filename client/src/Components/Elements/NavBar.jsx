import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import Button from "./Button";
import Header from "./Header";
import AuthPopup from "./AuthPop";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false); // Register popup
  const [showAuthPopup1, setShowAuthPopup1] = useState(false); // Login popup
  const [hasToken, setHasToken] = useState(false);

  const navigate = useNavigate();

  // ✅ Check if token exists in localStorage
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("leoToken");
      setHasToken(!!token);
    };

    checkToken(); // run at mount
    window.addEventListener("storage", checkToken); // update if storage changes
    return () => window.removeEventListener("storage", checkToken);
  }, []);

  // ✅ Handle screen resize (hamburger toggle)
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setShowHamburger(width >= 100 && width <= 1280);
      if (width > 1280) setIsOpen(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Close mobile nav on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen && showHamburger) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen, showHamburger]);

  // ✅ Handler for Member Portal
  const handleMemberPortalClick = (e) => {
    const token = localStorage.getItem("leoToken");
    if (!token) {
      e.preventDefault(); // stop navigation
      setShowAuthPopup1(true); // show Login popup
    } else {
      navigate("/memberportal"); // allow navigation
    }
  };

  return (
    <>
      {/* Popup for Register (SignUp as member) */}
      {showAuthPopup && (
        <AuthPopup
          onClose={() => setShowAuthPopup(false)}
          defaultMode="signup"
        />
      )}

      {/* Popup for Login */}
      {showAuthPopup1 && (
        <AuthPopup
          onClose={() => setShowAuthPopup1(false)}
          defaultMode="login"
        />
      )}

      <nav className="w-full bg-white shadow-md hover:bg-blue-50 transition duration-300 rounded-sm fixed top-0 z-40">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="flex items-center justify-between h-20 relative">
            <Header dark={false} />

            {showHamburger && (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-700 z-20"
                aria-label="Toggle menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}

            {/* Desktop Menu */}
            <div className="hidden xl:flex items-center space-x-6 ml-auto">
              <div className="flex space-x-6">
                {/* ✅ Protected Member Portal */}
                <Link
                  to="/memberportal"
                  className="link"
                  onClick={handleMemberPortalClick}
                >
                  Member Portal
                </Link>

                <Link to="/project" className="link">Projects</Link>
                <Link to="/calander" className="link">Calendar</Link>
                <Link to="/shop" className="link">Shop</Link>
                <Link to="/about" className="link">About</Link>
              </div>

              <div className="flex items-center space-x-4">
                {!hasToken && (
                  <>
                    <Button
                      label="Register"
                      className="login"
                      onClick={() => setShowAuthPopup(true)}
                    />
                    <Button
                      label="Login"
                      className="login"
                      onClick={() => setShowAuthPopup1(true)}
                    />
                  </>
                )}
                <Link to="/donation">
                  <Button label="Donate" className="donate" />
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && showHamburger && (
            <div className="w-full bg-white rounded-md shadow-md mt-2 z-10">
              <div className="flex flex-col divide-y divide-gray-200">
                {[
                  { label: "Member Portal", to: "/memberportal", protected: true },
                  { label: "Project", to: "/project" },
                  { label: "Calendar", to: "/calander" },
                  { label: "Shop", to: "/shop" },
                  { label: "About", to: "/about" },
                ].map(({ label, to, protected: isProtected }) => (
                  <Link
                    key={to}
                    to={to}
                    className="link w-full px-4 py-3 text-center hover:bg-blue-100"
                    onClick={(e) => {
                      if (isProtected) {
                        handleMemberPortalClick(e);
                      } else {
                        setIsOpen(false);
                      }
                    }}
                  >
                    {label}
                  </Link>
                ))}

                <div className="flex flex-col items-center space-y-2 p-4">
                  {!hasToken && (
                    <>
                      <Button
                        label="Register"
                        className="login w-full"
                        onClick={() => setShowAuthPopup(true)}
                      />
                      <Button
                        label="Login"
                        className="login w-full"
                        onClick={() => setShowAuthPopup1(true)}
                      />
                    </>
                  )}
                  <Link to="/donation" className="donate w-full text-center">
                    <Button label="Donate" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
