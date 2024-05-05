import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';
import Footer from '../Footer';
import { useLocation } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import UserForm from '../UserForm'; // Імпорт компонента для авторизації та реєстрації

function PayForTicket() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [movie, setMovie] = useState(null);
  const [sessions, setSessions] = useState([]);

  // Отримання параметрів з URL
  const seats = JSON.parse(searchParams.get('seats'));
  const price = searchParams.get('totalPrice');
  const sessionId = searchParams.get('sessionId');
  const movieId = searchParams.get('movieId');

  useEffect(() => {
    // Отримання даних про фільм
    axios.get(`http://localhost:5555/movie/movie_id/${movieId}`)
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => {
        console.error('Error fetching movie:', error);
      });

    // Отримання даних про сеанси
    axios.get(`http://localhost:5555/session/${sessionId}`)
      .then(response => {
        setSessions(response.data);
      })
      .catch(error => {
        console.error('Error fetching sessions:', error);
      });
  }, [movieId, sessionId]);


  return (
    <>
      <br />
      <div className='about_page_container'>
        {/* Форма для авторизації та реєстрації */}
        <UserForm />
      </div>
      {movie && (
        <div className='about_page_container'>
          {/* Відображення інформації про фільм та квитки */}
          <h2>{movie.title}</h2>
          <img src={movie.image_URL} alt={movie.title} />
          <h3>Seats: {JSON.stringify(seats)}</h3>
          <h3>Price: {price}</h3>
          <h3>Session ID: {sessions._id}</h3>
          <h3>Movie ID: {movie.title}</h3>
        </div>
      )}
      <Footer />
    </>
  );
}

export default PayForTicket;
