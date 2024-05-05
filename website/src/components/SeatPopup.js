import React from 'react';
import './SeatPopup.css'; // Підключаємо CSS для стилізації

function SeatPopup({ seats, price }) {
  // Створення стану для зберігання обраних місць
  const [selectedSeats, setSelectedSeats] = React.useState([]);

  // Перевірка, чи є дані про місця
  if (!seats || seats.length === 0) {
    return <div>No seats data available</div>;
  }

  // Функція для вибору місця
  const handleSeatClick = (rowIndex, seatIndex) => {
    // Перевіряємо, чи місце вже було обране
    const isSelected = selectedSeats.some(seat => seat.rowIndex === rowIndex && seat.seatIndex === seatIndex);
    // Якщо місце вже було обране, видаляємо його, інакше додаємо до обраних
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter(seat => !(seat.rowIndex === rowIndex && seat.seatIndex === seatIndex)));
    } else {
      setSelectedSeats([...selectedSeats, { rowIndex, seatIndex }]);
    }
  };

  // Обрахунок загальної ціни обраних місць
  const totalPrice = selectedSeats.length * price;

  // Функція для оплати
  const handlePayment = () => {
    // Операції для оплати, наприклад, відправлення запиту на сервер
    console.log('Payment completed!');
  };

  return (
    <div className='seat-grid'>
      {/* Відображення кнопок для кожного місця */}
      {seats.map((row, rowIndex) => (
        <div key={rowIndex} className='seat-row'>
          {row.map((status, seatIndex) => (
            <button
              key={seatIndex}
              className={`seat ${status === 'free' ? 'seat-free' : 'seat-occupied'} ${selectedSeats.some(seat => seat.rowIndex === rowIndex && seat.seatIndex === seatIndex) ? 'seat-selected' : ''}`}
              onClick={() => handleSeatClick(rowIndex, seatIndex)} // Додаємо обробник натискання
              disabled={status === 'occupied'} // Забороняємо вибір вже зайнятих місць
            >
              {status === 'free' ? 'Free' : 'Occupied'}
            </button>
          ))}
        </div>
      ))}
      {/* Кнопка оплати та відображення ціни */}
      {selectedSeats.length > 0 && (
        <div className="payment-section">
          <button onClick={handlePayment}>Оплатити</button>
          <p>Загальна вартість: {totalPrice} грн</p>
        </div>
      )}
    </div>
  );
}

export default SeatPopup;
