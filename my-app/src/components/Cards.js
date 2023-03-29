// import React from 'react';
// import './Cards.css';
// import CardItem from './CardItem';

// function Cards() {
//   return (
//     <div className='cards'>
//       <h1>Check out these EPIC Destinations!</h1>
//       <div className='cards__container'>
//         <div className='cards__wrapper'>
//           <ul className='cards__items'>
//             <CardItem
//               src='images/safestreets.jpeg'
//               text='Burgers'
//               label='Map Tech'
//               path='/investmentopps'
//             />
//             <CardItem
//               src='images/eye.png'
//               text='Sandwiches'
//               label='Med Tech'
//               path='/investmentopps'
//             />
//           </ul>
//           <ul className='cards__items'>
//             <CardItem
//               src='images/thumb.png'
//               text='Baskets'
//               label='Agri Tech'
//               path='/investmentopps'
//             />
//             <CardItem
//               src='images/idea.png'
//               text='Sides'
//               label='Creator'
//               path='/addprojects'
//             />
//             <CardItem
//               src='images/paw.png'
//               text='Seasonal'
//               label='Vet Tech'
//               path='/investmentopps'
//             />
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Cards;

import React from 'react';
import './Cards.css';

function Card({ title, text, image }) {
  return (
    <div className='card'>
      <img src={image} alt={title} className='card-image' />
      <div className='card-body'>
        <h2 className='card-title'>{title}</h2>
        <p className='card-text'>{text}</p>
      </div>
    </div>
  );
}

export default Card;
