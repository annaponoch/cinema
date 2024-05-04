import React from 'react';
import './SeatPopup.css'; // Підключаємо CSS для стилізації

function SeatPopup({ seats }) {
  // Перевірка, чи є дані про місця
  if (!seats || seats.length === 0) {
    return <div>No seats data available</div>;
  }

  // Функція для визначення CSS класу в залежності від статусу місця
  const getSeatClass = (status) => {
    return status === 'free' ? 'seat-free' : 'seat-occupied';
  };

  return (
    <div className='seat-grid'>
      {/* Відображення кнопок для кожного місця */}
      {seats.map((row, rowIndex) => (
        <div key={rowIndex} className='seat-row'>
          {row.map((status, seatIndex) => (
            <div key={seatIndex} className={`seat ${getSeatClass(status)}`}>
              {status === 'free' ? 'Free' : 'Occupied'}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default SeatPopup;
