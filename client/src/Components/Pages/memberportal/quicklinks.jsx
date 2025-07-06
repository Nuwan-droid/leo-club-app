import React from "react";
import { FaGlobe, FaUser, FaProjectDiagram, FaExternalLinkAlt } from "react-icons/fa";

const QuickLinks = () => {
  const links = [
    { id: 1, title: "Lions International", url: "https://www.lionsclubs.org/en", icon: <FaGlobe /> },
    { id: 2, title: "My LEO Portal", url: "https://myleo.leomd306.org", icon: <FaUser /> },
    { id: 3, title: "LEO World Projects", url: "https://www.lionsclubs.org/en", icon: <FaProjectDiagram /> },
  ];

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 bg-gray-50 border-b">
          <h4 className="text-lg font-semibold text-gray-800">Quick Links</h4>
        </div>
        <div className="p-2">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank" // Opens link in a new tab
              rel="noopener noreferrer" // Security best practice for external links
              className="flex items-center justify-between p-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 ease-in-out group"
            >
              <div className="flex items-center space-x-3">
                <span className="text-blue-500 group-hover:text-blue-600 transition-colors">
                  {link.icon}
                </span>
                <span className="font-medium">{link.title}</span>
              </div>
              <FaExternalLinkAlt className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" size="0.8em" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickLinks;
