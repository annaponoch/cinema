import React from 'react';
import { Link } from 'react-router-dom';

function CardItem(props) {
  return (
    // <div className='cards__item'>
        <Link to={`/session/${props.movieId}/${props.date}`} className='cards__item'>
          <div className='cards__item__pic-wrap'>
            <img
              className='cards__item__img'
              alt='Travel'
              src={props.src}
            />
            
          </div>
          <div className='cards__item__info'>
            <h5 className='cards__item__text'>{props.text}</h5>
          </div>
        </Link>
    // </div>
  );
}

export default CardItem;
