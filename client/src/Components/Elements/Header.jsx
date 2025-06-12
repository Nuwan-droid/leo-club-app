import logo from "../../assets/leo.png";

export default function Header({ dark = false }) {
  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      {/* Logo */}
      <img
        src={logo}
        alt="Club Logo"
        className={`h-16 w-16 sm:h-30 sm:w-30 object-contain ${dark ? "invert" : ""}`}
      />

      {/* Divider */}
      <div className={`w-0.5 h-10 sm:h-16 ${dark ? "bg-white" : "bg-black"}`} />

      {/* Text with margin-left */}
      <div className="flex flex-col ml-2">
        <span
          className={`text-base sm:text-lg md:text-xl lg:text-2xl font-semibold ${
            dark ? "text-white" : "text-black"
          }`}
        >
          <b>LEO</b> CLUB OF
        </span>
        <span
          className={`text-base sm:text-lg md:text-xl lg:text-2xl ${
            dark ? "text-white" : "text-black"
          }`}
        >
          Uva Wellassa University
        </span>
      </div>
    </div>
  );
}
