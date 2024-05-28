import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../pages/PayForTicket.css'
import PaymentModal from './PaymentModal';

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

  const handleConfirmPayment = () => {
    if (!loggedInUser) {
      alert('Будь ласка, увійдіть або зареєструйтеся, щоб продовжити.');
      return;
    }
    
    if (paymentMethod === 'online') {
      setShowModal(true);
    } else {
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
        const transactionId = response.data._id;
        navigate(`/ticket?seats=${encodeURIComponent(JSON.stringify(seats))}&totalPrice=${price}&sessionId=${sessionId}&movieId=${movie.title}&userEmail=${loggedInUser.email}&transactionId=${transactionId}`);
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
    <>
      {movie && (
        <>
        <div className='user_h2_container'><h2>Обрані квитки</h2></div>
        <div className='info_container'>
          <h3>Фільм: {movie.title}</h3>
          <h3>Місця: {seats.map(seat => `Ряд ${seat.rowIndex + 1} Місце ${seat.seatIndex + 1}`).join(', ')}</h3>
          <h3>До сплати: {price} гривень</h3>
          <h3>Дата та час сеансу: {new Date(sessions.date_time).toLocaleString()}</h3>
          {(!loggedInUser) && (
            <p> Будь ласка, увійдіть або зареєструйтеся, щоб продовжити</p>
          )}
          </div>
        </>
      )}
      {(loggedInUser) && (
        <>
          <Form className='f_container'>
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
          <div className='logout_button_container'>
          <Button className='button_book' variant="dark" onClick={handleConfirmPayment}>
            Забронювати
          </Button></div>
          <PaymentModal show={showModal} handleClose={() => setShowModal(false)} handlePayment={() => {
              axios.post('http://localhost:5555/transaction', {
                movie_id: movieId,
                session_id: sessionId,
                user_id: loggedInUser._id,
                user_email: loggedInUser.email,
                booking_date: new Date(),
                payment_method: 'card',
                payed_uah: price,
                booked_seats: seats.map(seat => `Ряд ${seat.rowIndex + 1} Місце ${seat.seatIndex + 1}`),
              }).then(response => {
                console.log('Transaction created:', response.data);
                const transactionId = response.data._id;
                navigate(`/ticket?seats=${encodeURIComponent(JSON.stringify(seats))}&totalPrice=${price}&sessionId=${sessionId}&movieId=${movie.title}&userEmail=${loggedInUser.email}&transactionId=${transactionId}`);
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
        </>
      )}
    </>
  );
}

export default TicketInfo;
