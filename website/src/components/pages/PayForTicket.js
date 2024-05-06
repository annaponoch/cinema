import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';
import Footer from '../Footer';
import { useLocation } from 'react-router-dom';
import UserForm from '../UserForm'; 
import { Button } from 'react-bootstrap';

function PayForTicket() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [movie, setMovie] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);


  const seats = JSON.parse(searchParams.get('seats'));
  const price = searchParams.get('totalPrice');
  const sessionId = searchParams.get('sessionId');
  const movieId = searchParams.get('movieId');

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

    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }

  }, [movieId, sessionId]);


  const handleLogin = (user) => {
    setLoggedInUser(user);
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('loggedInUser');
  };

  return (
    <>
      <br />
      {loggedInUser ? (
        <div className='about_page_container'>
          <div className='user_h2_container'>
            <h3>Дані користувача</h3>
          </div>
          <p>Ім'я: {loggedInUser.name}</p>
          <p>Email: {loggedInUser.email}</p>
          <Button variant="danger" onClick={handleLogout}>
            Вийти
          </Button>
          <br />
        </div>
      ) : (
        <UserForm onLogin={handleLogin} />
      )}
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
        {(!loggedInUser) && (
          <p>Будь ласка, увійдіть або зареєструйтеся, щоб продовжити</p>
        )}
        {loggedInUser && (
          <>
            <h3>User Name: {loggedInUser.name}</h3>
            <h3>User Email: {loggedInUser.email}</h3>
          </>
        )}
        <br />
        {loggedInUser && movie && (
          <>
          <Button variant="dark" type="submit">
            Забронювати
          </Button>
          </>
        )}

        <br />
      </div>
      <Footer />
    </>
  );
}

export default PayForTicket;
