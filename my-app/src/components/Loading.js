import React from 'react';
import './Loading.css'; // Importing styles for the Loading component

/**
 * Functional component that displays a loading spinner with a text message
 * @returns {JSX.Element} The Loading component
 */
const Loading = () => {
  return (
    <div className='loading'>
      <div className='loading-text'> 
        Loading<span className='dot-1'>.</span><span className='dot-2'>.</span><span className='dot-3'>.</span>
      </div>
    </div>
  );
};

export default Loading; // Exporting the Loading component for use in other modules