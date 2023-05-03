import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

const STYLES = ['btn--primary', 'btn--outline', 'btn--third', 'btn--outlinee'];

const SIZES = ['btn--medium', 'btn--large'];

/**
  * Button component that can be customized with different styles and sizes.
  * @param {object} props - The props that are passed to this component.
  * @param {React.ReactNode} props.children - The text or elements to be displayed inside the button.
  * @param {string} props.type - The type of button (e.g. "button", "submit", "reset").
  * @param {function} props.onClick - The function to be executed when the button is clicked.
  * @param {string} props.buttonStyle - The style of the button. Possible values are "btn--primary", "btn--outline", "btn--third", "btn--outlinee".
  * @param {string} props.buttonSize - The size of the button. Possible values are "btn--medium", "btn--large".
  * @param {string} props.path - The path for the link to which the button is redirected.
  * @returns {JSX.Element} A button element that can be customized with different styles and sizes.
  */
export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  path
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <Link to = {path} className='btn-mobile'>
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </Link>
  );
};