import React, { useState, useEffect } from 'react';
import './SeatPopup.css'; // Подключаємо CSS для стилізації

function SeatPopup({ seats }) {
  // Створюємо стан для зберігання статусу кожного місця
  const [seatStatus, setSeatStatus] = useState([]);

  // Оновлюємо стан seatStatus при зміні пропа seats
  useEffect(() => {
    if (seats && seats.length > 0) {
      setSeatStatus(seats);
    }
  }, [seats]);

  // Функція для оновлення статусу місця при натисканні
  const handleSeatClick = (rowIndex, seatIndex) => {
    // Копіюємо стан масиву місць
    const updatedSeats = [...seatStatus];

    // Перевіряємо, чи вільне місце
    if (updatedSeats[rowIndex][seatIndex] === 'free') {
      // Змінюємо статус обраного місця на "selected"
      updatedSeats[rowIndex][seatIndex] = 'selected';
    } else if (updatedSeats[rowIndex][seatIndex] === 'selected') {
      // Змінюємо статус обраного місця на "free"
      updatedSeats[rowIndex][seatIndex] = 'free';
    }

    // Оновлюємо стан масиву місць
    setSeatStatus(updatedSeats);
  };

  // Функція для визначення CSS класу в залежності від статусу місця
  const getSeatClass = (status) => {
    switch (status) {
      case 'free':
        return 'seat-free';
      case 'occupied':
        return 'seat-occupied';
      case 'selected':
        return 'seat-selected';
      default:
        return '';
    }
  };

  // Перевірка, чи є дані про місця
  if (!seatStatus || seatStatus.length === 0) {
    return <div>No seats data available</div>;
  }

  return (
    <div className='seat-grid'>
      {/* Відображення кнопок для кожного місця */}
      {seatStatus.map((row, rowIndex) => (
        <div key={rowIndex} className='seat-row'>
          {row.map((status, seatIndex) => (
            <button
              key={seatIndex}
              className={`seat ${getSeatClass(status)}`}
              disabled={status === 'occupied'} // Вимикаємо кнопку для зайнятих місць
              onClick={() => handleSeatClick(rowIndex, seatIndex)} // Додаємо обробник натискання
            >
              {status === 'free' ? 'Free' : status === 'selected' ? 'Selected' : 'Occupied'}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default SeatPopup;
