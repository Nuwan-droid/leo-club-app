import React from "react";
import { Link } from "react-router-dom";

const QuickLinks = () => {
  const links = [
    { id: 1, title: "Links 1", url: "#" },
    { id: 2, title: "Links 1", url: "#" },
    { id: 3, title: "Links 1", url: "#" },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-yellow-400 rounded-lg p-4 text-center">
        <Link to="/donation" className="text-black font-medium block w-full">
          Donate
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <h4 className="font-medium text-gray-900 mb-3">Quick Links</h4>
        <div className="space-y-2">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              className="block text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              {link.title}
            </a>
          ))}
        </div>
      </div>

      <div className="bg-blue-600 rounded-lg p-4 text-center">
        <button className="text-white font-medium">Leo AI ✨</button>
      </div>
    </div>
  );
};

export default QuickLinks;
