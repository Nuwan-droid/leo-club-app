import PropTypes from "prop-types";
function Button({ label, className = "", onClick }) {
  return (
    <button className={`${className}`} onClick={onClick}>
      {" "}
      {label}
    </button>
  );
}

Button.PropTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
Button.defaultProps = {
  label: "Button",
  className: "",
  onClick: () => {
    console.log("Button clicked");
  },
};

export default Button;
