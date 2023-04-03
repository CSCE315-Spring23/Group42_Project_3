import React from 'react';
import './Cards.css';

function EmployeeCard({ title, text }) {
  return (
    <div className='card'>
      <div className='card-body'>
        <h2 className='card-title'>{title}</h2>
        <p className='card-text'>{text}</p>
      </div>
    </div>
  );
}

export default EmployeeCard;
