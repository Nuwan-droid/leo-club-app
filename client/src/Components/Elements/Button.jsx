import PropTypes from "prop-types";

export default function Button({ label, className = "", onClick, type = "button" }) {
  return (
    <button className={className} onClick={onClick} type={type}>
      {label}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

Button.defaultProps = {
  label: "Button",
  className: "",
  onClick: () => {
    console.log("Button clicked");
  },
  type: "button",
};
