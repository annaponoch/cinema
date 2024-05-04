import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  const [movies, setMovies] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5555/movie')
      .then(movieResponse => {
        axios.get('http://localhost:5555/session')
          .then(sessionResponse => {
            const moviesData = movieResponse.data.map(movie => {
              const sessions = sessionResponse.data.filter(session => session.movie_id === movie.movie_id);
              const dates = sessions.map(session => new Date(session.date_time).toISOString().split('T')[0]);
              if (dates.length > 0) {
                return {
                  title: movie.title,
                  image: movie.image_URL,
                  dates: dates,
                  movieId: movie.movie_id // Додано movieId в об'єкт фільму
                };
              }
              return null;
            }).filter(movie => movie !== null);
            setMovies(moviesData);
            setSelectedDate(getEarliestDate(moviesData));
          })
          .catch(error => {
            console.error('Error fetching sessions:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  const getEarliestDate = (movies) => {
    const sortedMovies = [...movies].sort((a, b) => new Date(a.dates[0]) - new Date(b.dates[0]));
    return sortedMovies[0]?.dates[0] || ''; 
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const uniqueDates = Array.from(new Set(movies.flatMap(movie => movie.dates))).sort(); // Додано сортування

  const filteredMovies = movies.filter((movie) => movie.dates.includes(selectedDate));

  return (
    <div className='cards'>
      <h1>Сеанси</h1>
      <div className='date-buttons'>
        {uniqueDates.map((date, index) => (
          <button key={index} onClick={() => handleDateChange(date)}>{date}</button>
        ))}
      </div>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            {filteredMovies.map((movie, index) => (
              <CardItem
                key={index}
                src={movie.image}
                heading={movie.title}
                text={movie.title}
                movieId={movie.movieId} // Передача movieId у CardItem
                date={selectedDate} // Передача вибраної дати у CardItem
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
