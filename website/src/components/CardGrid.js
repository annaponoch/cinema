import React from 'react';
import './Cards.css';
import { Card } from 'react-bootstrap';

// Оголошуємо масив з айтемами
const movies = [
  { title: 'Inception', image: '/images/inception.jpg' },
  { title: 'Interstellar', image: '/images/interstellar.jpg' },
  { title: 'The Shawshank Redemption', image: '/images/shawshank.jpg' },
  { title: 'The Godfather', image: '/images/godfather.jpg' },
  { title: 'Pulp Fiction', image: '/images/pulp-fiction.jpg' },
  
  // Додавайте інші фільми за необхідністю
];

function CardGrid() {
    return (
      <div className="cards__container">
        <div className="cards__wrapper">
          {movies.map((movie, index) => (
            <div className="cards__item" key={index}>
              <figure className="cards__item__pic-wrap">
                <img src={movie.image} alt={movie.title} className="cards__item__img" />
                <figcaption className="cards__item__text">{movie.title}</figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    );
  }

export default CardGrid;