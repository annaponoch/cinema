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
                  format: movie.format,
                  movieId: movie.movie_id 
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

  const uniqueDates = Array.from(new Set(movies.flatMap(movie => movie.dates))).sort(); 

  const filteredMovies = movies.filter((movie) => movie.dates.includes(selectedDate));

  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'long', day: 'numeric' };
    return date.toLocaleDateString('uk-UA', options);
  };
  

  return (
    <>
      <div className='date-container'>
        
        <h1>Сеанси</h1>
        <div className='date-buttons'>
          <select className='date-select' onChange={(e) => handleDateChange(e.target.value)}>
            {uniqueDates.map((date, index) => (
              <option className='date-option' key={index} value={date}>{getFormattedDate(date)}</option>
            ))}
          </select>
        </div>
      </div>
      <div className='cards'>
        <div className='cards__items'>
          {filteredMovies.map((movie, index) => (
            <CardItem
              key={index}
              src={movie.image}
              heading={movie.title}
              text={movie.title}
              movieId={movie.movieId} 
              date={selectedDate}
              format={movie.format}  
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Cards;
