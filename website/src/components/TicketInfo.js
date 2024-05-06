import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

function TicketInfo({ movieId, sessionId, loggedInUser }) {
  const [movie, setMovie] = useState(null);
  const [seats, setSeats] = useState([]);
  const [price, setPrice] = useState(null);
  const [sessions, setSessions] = useState([]);
  
  useEffect(() => {
    // Запит на сервер за даними про фільм
    axios.get(`http://localhost:5555/movie/movie_id/${movieId}`)
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => {
        console.error('Error fetching movie:', error);
      });
    
    // Запит на сервер за даними про сеанс
    axios.get(`http://localhost:5555/session/${sessionId}`)
      .then(response => {
        setSessions(response.data);
      })
      .catch(error => {
        console.error('Error fetching sessions:', error);
      });
      
  }, [movieId, sessionId]);

  return (
    <div className='about_page_container'>
      {/* Відображення інформації про фільм та квитки */}
      {movie && (
        <>
          <h2>Обрані квитки</h2>
          <h3>Movie: {movie.title}</h3>
          <img src={movie.image_URL} alt={movie.title} />
          <h3>Seats: {seats.map(seat => `Ряд ${seat.rowIndex + 1} Місце ${seat.seatIndex + 1}`).join(', ')}</h3>
          <h3>Price: {price}</h3>
          <h3>Session Date & Time: {new Date(sessions.date_time).toLocaleString()}</h3>
        </>
      )}
      {(!loggedInUser) && (
        <p>Будь ласка, увійдіть або зареєструйтеся, щоб продовжити</p>
      )}
      <br />
      <Button variant="dark" type="submit">
        Забронювати
      </Button>
      <br />
    </div>
  );
}

export default TicketInfo;
