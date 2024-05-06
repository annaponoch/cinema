import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import PaymentModal from './PaymentModal';

function TicketInfo({ movieId, sessionId, loggedInUser, seats, price }) {
  const [movie, setMovie] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const navigate = useNavigate();
  console.log('seats:', seats);

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

  const handleConfirmPayment = () => {
    if (paymentMethod === 'online') {
      setShowModal(true);
    } else {
      // Якщо обрано оплату готівкою, робимо запит на сервер і переходимо на нову сторінку
      axios.post('http://localhost:5555/transaction', {
        movie_id: movieId,
        session_id: sessionId,
        user_id: loggedInUser._id,
        user_email: loggedInUser.email,
        booking_date: new Date(),
        payment_method: 'cash',
        payed_uah: price,
        booked_seats: seats.map(seat => `Ряд ${seat.rowIndex + 1} Місце ${seat.seatIndex + 1}`),
      }).then(response => {
        console.log('Transaction created:', response.data);
        navigate('/ticket'); // Перехід на нову сторінку
      }).catch(error => {
        console.error('Error creating transaction:', error);
      });

      axios.put(`http://localhost:5555/session/seats/${sessionId}`,{
        seats: seats
      })
      .then(response => {
        setSessions(response.data);
      })
      .catch(error => {
        console.error('Error changing session:', error);
      });
      
    }
  };

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
      <Form>
        <Form.Check
          type="radio"
          label="Оплатити в касі кінотеатру"
          name="paymentMethod"
          id="cashPayment"
          checked={paymentMethod === 'cash'}
          onChange={() => setPaymentMethod('cash')}
        />
        <Form.Check
          type="radio"
          label="Оплатити карткою онлайн"
          name="paymentMethod"
          id="onlinePayment"
          checked={paymentMethod === 'online'}
          onChange={() => setPaymentMethod('online')}
        />
      </Form>
      <br />
      <Button variant="dark" onClick={handleConfirmPayment}>
        Забронювати
      </Button>
      <PaymentModal show={showModal} handleClose={() => setShowModal(false)} handlePayment={() => {
        // Оплата карткою онлайн, викликається після введення даних картки в модальному вікні
        axios.post('http://localhost:5555/transaction', {
          movie_id: movieId,
          session_id: sessionId,
          user_id: loggedInUser._id,
          user_email: loggedInUser.email,
          booking_date: new Date(),
          payment_method: 'online',
          payed_uah: price,
          booked_seats: seats.map(seat => `Ряд ${seat.rowIndex + 1} Місце ${seat.seatIndex + 1}`),
        }).then(response => {
          console.log('Transaction created:', response.data);
          navigate('/ticket'); // Перехід на нову сторінку
        }).catch(error => {
          console.error('Error creating transaction:', error);
        });

        axios.put(`http://localhost:5555/session/seats/${sessionId}`,{
          seats: seats
        })
        .then(response => {
          setSessions(response.data);
        })
        .catch(error => {
          console.error('Error changing session:', error);
        });
      }} />
    </div>
  );
}

export default TicketInfo;
