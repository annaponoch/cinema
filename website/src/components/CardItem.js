// CardItem.js

import React from 'react';
import { Link } from 'react-router-dom';

function CardItem(props) {
  return (
    <Link to={`/session/${props.movieId}/${props.date}`} className='cards__item'>
      <div className='cards__item__pic-wrap'>
        <img
          className='cards__item__img'
          alt='Travel'
          src={props.src}
        />
      </div>
      <div className='cards__item__info'>
        <h5 className='cards__item__text'>{props.heading}</h5> {/* Використовуємо props.heading замість props.text */}
        <div className='format'>
          <h3>{props.format}</h3>
        </div>
      </div>
    </Link>
  );
}

export default CardItem;
