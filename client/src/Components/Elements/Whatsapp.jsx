// Components/WhatsAppButton.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/94712345678"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300"
    >
      <FontAwesomeIcon icon={faWhatsapp} size="lg" />
    </a>
  );
};

export default WhatsAppButton;
