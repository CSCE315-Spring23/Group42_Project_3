import React from 'react';
import './Popup.css';

function Popup(props) {
  const { cardData, onClose } = props;

  return (
    <div className='popup'>
      <div className='popup__content'>
    
        <button className='popup__close' onClick={onClose}>
          X
        </button>
      </div>
      </div>
  );
}

export default Popup;
