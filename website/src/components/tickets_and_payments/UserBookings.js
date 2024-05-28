import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function TicketInfo({ movieId, sessionId, loggedInUser, seats, price }) {
  const [movie, setMovie] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5555/movie/movie_id/${movieId}`)
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => {
        console.error('Error fetching movie:', error);
      });
    
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
      <br />
    </div>
  );
}

export default TicketInfo;
