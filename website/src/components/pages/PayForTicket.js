import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';
import Footer from '../Footer';
import { useLocation } from 'react-router-dom';
import UserForm from '../UserForm'; // Імпорт компонента для авторизації та реєстрації
import { Button } from 'react-bootstrap';

function PayForTicket() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [movie, setMovie] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [userId, setUserId] = useState(null); // Додайте стейт для _id користувача
  const [user, setUser] = useState(null);

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
        // Отримання даних про користувача
    axios.get(`http://localhost:5555/user/${userId}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });
  }, [movieId, sessionId,userId]);

  // Функція для збереження _id користувача після авторизації чи реєстрації
  const handleLogin = (id) => {
    setUserId(id);
  };

  return (
    <>
      <br />
        <UserForm onLogin={handleLogin} />
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
        {(!userId) && (
          <p>Будь ласка, увійдіть або зареєструйтеся, щоб продовжити</p>
        )}
        {user && (<>
          <h3>User Name: {user.name}</h3>
          <h3>User Email: {user.email}</h3>
        </>)}
        <br />
        <Button variant="dark" type="submit">
          Забронювати
          </Button>
          <br />
      </div>
      <Footer />
    </>
  );
}

export default PayForTicket;
