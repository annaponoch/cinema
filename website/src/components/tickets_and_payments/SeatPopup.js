import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SeatPopup.css';

function SeatPopup({ seats, price, sessionId, movieId }) {
  const [selectedSeats, setSelectedSeats] = React.useState([]);
  const navigate = useNavigate();

  const handleSeatClick = (rowIndex, seatIndex) => {
    const isSelected = selectedSeats.some(seat => seat.rowIndex === rowIndex && seat.seatIndex === seatIndex);
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter(seat => !(seat.rowIndex === rowIndex && seat.seatIndex === seatIndex)));
    } else {
      setSelectedSeats([...selectedSeats, { rowIndex, seatIndex }]);
    }
  };

  const totalPrice = selectedSeats.length * price;

  const handlePayment = () => {
    const selectedSeatsString = JSON.stringify(selectedSeats);
    // Перенаправлення на сторінку /pay разом з параметрами через URL
    navigate(`/pay?seats=${selectedSeatsString}&totalPrice=${totalPrice}&sessionId=${sessionId}&movieId=${movieId}`);
  };
 
  return (
    <div className='seat-grid'>
      {seats.map((row, rowIndex) => (
        <div key={rowIndex} className='seat-row'>
          <div className='number-row'>{`${rowIndex + 1}`}</div>
          {row.map((status, seatIndex) => (
            <button
              key={seatIndex}
              className={`seat ${status === 'free' ? 'seat-free' : 'seat-occupied'} ${selectedSeats.some(seat => seat.rowIndex === rowIndex && seat.seatIndex === seatIndex) ? 'seat-selected' : ''}`}
              onClick={() => handleSeatClick(rowIndex, seatIndex)} 
              disabled={status === 'occupied'} 
            >
              {`${seatIndex + 1}`}
            </button>
          ))}
        </div>
      ))}
      {selectedSeats.length > 0 && (
        <div className="payment-section">
          <p>Загальна вартість: {totalPrice} грн</p>
          <p>Обрані місця:</p>
          <p>{selectedSeats.map((seat, index) => (
              <span key={index}>{`(Ряд ${seat.rowIndex+1}, Місце ${seat.seatIndex+1})`}</span>
            ))}
          </p>
          <div className="button-cont"><button className="payment-button" onClick={handlePayment}>Купити квитки</button></div>
        </div>
      )}
    </div>
  );

}

export default SeatPopup;
