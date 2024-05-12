import React from 'react';
import QRCode from "react-qr-code";
import Footer from '../Footer';
import { useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Стилі для PDF

const Ticket = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const seats = JSON.parse(searchParams.get('seats'));
  const price = searchParams.get('totalPrice');
  const sessionId = searchParams.get('sessionId');
  const movieId = searchParams.get('movieId');
  const transactionId = searchParams.get('transactionId');
  const userEmail = searchParams.get('userEmail');

  const handleDownloadPDF = () => {
    const filename = 'ticket.pdf';
    const input = document.getElementById('ticketContent');
  
    html2canvas(input, {
      scale: 2,
      backgroundColor: '#1B1B29' // Встановлюємо бажаний колір фону
    }).then((canvas) => {
      const pdf = new jsPDF('p', 'mm', 'a6');
      const imgData = canvas.toDataURL('image/png');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(filename);
    });
  };
  
  


  return (
    <>
 
        <div className='ticket_page'>
          <div className='ticket'>
          <h1>Обрані квитки</h1>
        <div className='ticketContent' id="ticketContent">
          <div className='ticket_info'>
          {movieId && (
              <>
              <h3>Фільм:</h3>
              <h4>{movieId}</h4>
            </>
          )}
          {seats.length > 0 && (
            <>
              <h3>Заброньовані місця:</h3>
              {seats.map((seat, index) => (
                <h4 key={index}>{`(Ряд ${seat.rowIndex + 1}, Місце ${seat.seatIndex + 1})`}</h4>
              ))}
            </>
          )}
          {price && (
            <>
              <h3>Загальна вартість:</h3>
              <h4>{price} гривень</h4>
            </>
          )}
          {sessionId && (
            <>
              <h3>Дата та час сеансу:</h3>
              <h4>{sessionId}</h4>
            </>
          )}
          {userEmail && (
            <>
              <h3>Електронна пошта:</h3>
              <h4>{userEmail}</h4>
            </>
          )}
          {transactionId && (
            <>
              <h3>Номер квитка:</h3>
              <h4>{transactionId}</h4>
            </>
          )}
            </div>
            <div className='QR_cont'>
              <QRCode value={transactionId} size={256} />
              
            </div>
          </div>
          <div className='b_con'><button className='download_button' onClick={handleDownloadPDF}>Завантажити PDF</button></div>
          </div>
        </div>
      <Footer />
    </>
  );
}

export default Ticket;
