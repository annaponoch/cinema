import React, { useState, useEffect } from 'react';
import '../../App.css';
import Footer from '../Footer';
import { useLocation } from 'react-router-dom';
import UserForm from '../tickets_and_payments/UserForm'; 
import TicketInfo from '../tickets_and_payments/TicketInfo'; // Імпорт нового модуля
import { Button } from 'react-bootstrap';

function PayForTicket() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []); // Додаємо пустий масив для запобігання безкінечного циклу

  const handleLogin = (id) => {
    setLoggedInUser(id);
    localStorage.setItem('loggedInUser', JSON.stringify(id));
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('loggedInUser');
  };

  // Отримання параметрів з URL
  const seats = JSON.parse(searchParams.get('seats'));
  const price = searchParams.get('totalPrice');
  const sessionId = searchParams.get('sessionId');
  const movieId = searchParams.get('movieId');

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
      <TicketInfo movieId={movieId} sessionId={sessionId} loggedInUser={loggedInUser} seats={seats} price={price} />
      <Footer />
    </>
  );
}

export default PayForTicket;
