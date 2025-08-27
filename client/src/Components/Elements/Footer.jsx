import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from "./Header";

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
                <a href="/terms" className="text-[gray] text-lg hover:text-white">Terms</a>
                <a href="/privacy-policy" className="text-[gray] text-lg hover:text-white">Privacy</a>
              </div>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden lg:block w-px bg-gray-600"></div>

          {/* Right: Navigation Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center lg:w-1/2">
            <div>
              <ul className="space-y-1 text-sm text-gray-400">
                <li><a href="#" className="shortlink">Member Portal</a></li>
                <li><a href="#" className="shortlink">Learnin Hub</a></li>
                <li><a href="#" className="shortlink">News Letter</a></li>
                <li><a href="#" className="shortlink">Event Volunteer</a></li>
              </ul>
            </div>
            <div>
              <ul className="space-y-1 text-sm text-gray-400">
                <li><a href="#" className="shortlink">Project</a></li>
                <li><a href="#" className="shortlink">Calander</a></li>
                <li><a href="#" className="shortlink">Shop</a></li>
                <li><a href="#" className="shortlink">About</a></li>
              </ul>
            </div>
            <div>
              <ul className="space-y-1 text-sm text-gray-400">
                <li><a href="#" className="shortlink">LEO AI</a></li>
              </ul>
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
