import React, { useState, useEffect } from 'react';
import Footer from '../Footer';
import { useLocation } from 'react-router-dom';
import UserForm from '../tickets_and_payments/UserForm'; 
import TicketInfo from '../tickets_and_payments/TicketInfo'; 
import { Button } from 'react-bootstrap';
import './PayForTicket.css'

function PayForTicket() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []); 

  const handleLogin = (id) => {
    setLoggedInUser(id);
    localStorage.setItem('loggedInUser', JSON.stringify(id));
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('loggedInUser');
  };

  const seats = JSON.parse(searchParams.get('seats'));
  const price = searchParams.get('totalPrice');
  const sessionId = searchParams.get('sessionId');
  const movieId = searchParams.get('movieId');

  return (
    <>
    <div className='pay_for_page'>
      <h1>Купити квитки</h1>
      <div className='all_container'>
        <div className='user_part'>
        {loggedInUser ? (
        <div className='user_container'>
          <div className='user_h2_container'>
            <h2>Дані користувача</h2>          
            <div className='user_data'>
            <h3>Ім'я: {loggedInUser.name}</h3>
            <h3>Email: {loggedInUser.email}</h3>
            <div className='logout_button_container'><Button className='button_logout' variant="link" onClick={handleLogout}>
            Змінити акаунт
          </Button></div>
            </div>
          </div>
        </div>
      ) : (
        <UserForm onLogin={handleLogin} />
      )}
        </div>
        <div className='ticket_part'>
        <TicketInfo movieId={movieId} sessionId={sessionId} loggedInUser={loggedInUser} seats={seats} price={price} />
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default PayForTicket;
