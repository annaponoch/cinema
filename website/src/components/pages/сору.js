import React, { useState, useEffect } from 'react';
import {  Button } from 'react-bootstrap';
import axios from 'axios';
import '../../App.css';
import Footer from '../Footer';
import { useLocation } from 'react-router-dom';
import UserForm from '../UserForm';

function PayForTicket() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [movie, setMovie] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

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

    // Перевірка, чи є збережений користувач у localStorage
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, [movieId, sessionId]);

  const handleLogin = (user) => {
    setLoggedInUser(user);
    // Зберігаємо дані користувача у localStorage
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    // Видаляємо дані користувача з localStorage при виході
    localStorage.removeItem('loggedInUser');
  };

  return (
    <>
      <br />
        {/* Форма для авторизації та реєстрації */}
        {!loggedInUser && <UserForm onLogin={handleLogin} />}
        {loggedInUser && (
          <div>
            <p>Logged in as: {loggedInUser.name} ({loggedInUser.email})</p>
            <Button variant="link" onClick={handleLogout}>Logout</Button>
          </div>
        )}
      {movie && (
        <div className='about_page_container'>
          <div className='user_h2_container'>
          <h3 >Квитки</h3>
          </div> 
          {/* Відображення інформації про фільм та квитки */}
            <h3>Movie: {movie.title}</h3>
            <img src={movie.image_URL} alt={movie.title} />
            <h3>Seats: {seats.map(seat => `Ряд ${seat.rowIndex + 1} Місце ${seat.seatIndex + 1}`).join(', ')}</h3>
            <h3>Price: {price}</h3>
            <h3>Session Date & Time: {new Date(sessions.date_time).toLocaleString()}</h3>


        
        </div>
      )}
      <Footer />
    </>
  );
}

export default PayForTicket;
