import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  const [movies, setMovies] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(''); 
  const [genres, setGenres] = useState([]);
  const [uniqueDates, setUniqueDates] = useState([]);

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
                  genre: movie.genre, 
                  movieId: movie.movie_id 
                };
              }
              return null;
            }).filter(movie => movie !== null);
            setMovies(moviesData);
            setGenres([...new Set(moviesData.map(movie => movie.genre))]);
          })
          .catch(error => {
            console.error('Error fetching sessions:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  useEffect(() => {
    const dates = getUniqueDates(movies, selectedGenre);
    setUniqueDates(dates);
    setSelectedDate(dates[0] || ''); 
  }, [movies, selectedGenre]);

  const getUniqueDates = (movies, selectedGenre) => {
    let filteredDates = [];
    if (selectedGenre) {
      filteredDates = Array.from(new Set(movies.filter(movie => movie.genre === selectedGenre).flatMap(movie => movie.dates))).sort(); 
    } else {
      filteredDates = Array.from(new Set(movies.flatMap(movie => movie.dates))).sort(); 
    }
    return filteredDates;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    setSelectedDate('');
  };

  const filteredMovies = movies.filter((movie) => {
    return (!selectedDate || movie.dates.includes(selectedDate)) && (!selectedGenre || movie.genre === selectedGenre);
  });

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
          <select className='date-select' value={selectedDate} onChange={(e) => handleDateChange(e.target.value)}>
            {uniqueDates.map((date, index) => (
              <option className='date-option' key={index} value={date}>{getFormattedDate(date)}</option>
            ))}
          </select>
        </div>
        <div className='date-buttons'>
          <select className='date-select' onChange={(e) => handleGenreChange(e.target.value)}>
            <option className='date-option' value="">Оберіть жанр</option>
            {genres.map((genre, index) => (
              <option key={index} value={genre}>{genre}</option>
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
