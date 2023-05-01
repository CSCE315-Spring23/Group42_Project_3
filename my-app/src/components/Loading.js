import React from 'react';
import './Loading.css'; // Importing styles for the Loading component

/**
 * Functional component that displays a loading spinner with a text message
 * @returns {JSX.Element} The Loading component
 */
const Loading = () => {
  return (
    <div className='loading'> // The container div for the Loading component
      <div className='loading-text'> // The div for the loading text
        Loading<span className='dot-1'>.</span><span className='dot-2'>.</span><span className='dot-3'>.</span> // The loading text with three dots that animate
      </div>
    </div>
  );
};

export default Loading; // Exporting the Loading component for use in other modules