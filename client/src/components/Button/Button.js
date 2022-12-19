import s from "./Button.module.css";

export default function Button({ handleClick, text, type, styles, disabled }) {
  const getButtonStyle = () => {
    if (styles === "danger") {
      return s.danger;
    }
    if (styles === "black") {
      return s.black;
    }
    if (disabled) {
      return s.disabled;
    }

    return s.button;
  };

  return (
    <button
      type={type}
      className={getButtonStyle()}
      onClick={handleClick}
      disabled={disabled ? disabled : false}
    >
      {text}
    </button>
  );
}
