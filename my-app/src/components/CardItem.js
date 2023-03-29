import React from 'react';
import { Link } from 'react-router-dom';

function CardItem(props) {
  return (
    <>

      <li className='cards__item'>
        <Link className='cards__item__link' to={props.path}>
          <figure className='cards__item__pic-wrap' data-category={props.label}>
            <img
              className='cards_img'
              alt='Food item image'
              src={props.src}
            />
          </figure>
          <div className='cards_info'>
            <h5 className='cards__item__text'>{props.text}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}

export default CardItem;

// import React from 'react';
// import './Cards.css';

// function Card({ title, text, image }) {
//   return (
//     <div className='card'>
//       <img src={image} alt={title} className='card-image' />
//       <div className='card-body'>
//         <h2 className='card-title'>{title}</h2>
//         <p className='card-text'>{text}</p>
//       </div>
//     </div>
//   );
// }

// export default Card;