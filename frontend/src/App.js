import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Отримати дані про фільми
    axios.get('http://localhost:5555/movie')
      .then(movieResponse => {
        // Отримати дані про сеанси
        axios.get('http://localhost:5555/session')
          .then(sessionResponse => {
            const moviesData = movieResponse.data.map(movie => {
              // Фільтруємо сеанси за movie_id
              const sessions = sessionResponse.data.filter(session => session.movie_id === movie.title);
              // Отримуємо всі доступні дати сеансів для цього фільму
              const dates = sessions.map(session => new Date(session.date_time).toISOString().split('T')[0]);
              // Перевіряємо, чи є сеанси для цього фільму
              if (dates.length > 0) {
                return {
                  title: movie.title,
                  image: movie.image_URL,
                  dates: dates
                };
              }
              return null;
            }).filter(movie => movie !== null); // Видаляємо null значення
            setMovies(moviesData);
          })
          .catch(error => {
            console.error('Error fetching sessions:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  return (
    <div>
      <h1>Movies</h1>
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>
            <img src={movie.image} alt={movie.title} />
            <h2>{movie.title}</h2>
            <p>Dates: {movie.dates.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
