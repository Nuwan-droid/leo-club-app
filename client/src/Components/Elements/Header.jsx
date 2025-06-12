import logo from "../../assets/leo.png";

export default function Header({ dark = false }) {
  return (
    <div className="flex items-center space-x-3 min-w-0 ">
      <img src={logo} alt="Club Logo" className={`h-25 w-25 object-contain mr-0 ${ dark ? "invert" : ""}`} />
      <div
        className={`w-1 h-16 rounded-sm ${
          dark ? "bg-white" : "bg-black"
        }`}
      ></div>
      <div className="flex flex-col leading-tight min-w-0">
        <span
          className={`text-lg sm:text-xl md:text-2xl truncate ${
            dark ? "text-white" : "text-black"
          }`}
        >
          <b>LEO</b> CLUB OF
        </span>
        <span
          className={`text-lg sm:text-xl md:text-2xl truncate ${
            dark ? "text-white" : "text-black"
          }`}
        >
          Uva Wellassa University
        </span>
      </div>
    </div>
  );
}
