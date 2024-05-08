import React from 'react';
import QRCode from "react-qr-code";
import Footer from '../Footer';
import { useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Стилі для PDF
const styles = {
  container: {
    padding: 20
  },
  ticketContainer: {
    marginBottom: 20
  },
  qrCode: {
    width: 150,
    height: 150,
    marginTop: 10
  },
  downloadButton: {
    padding: 10,
    backgroundColor: '#007bff',
    color: '#ffffff',
    borderRadius: 5,
    textDecoration: 'none',
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 16,
    cursor: 'pointer',
    border: 'none'
  }
};

const Ticket = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const seats = JSON.parse(searchParams.get('seats'));
  const price = searchParams.get('totalPrice');
  const sessionId = searchParams.get('sessionId');
  const movieId = searchParams.get('movieId');
  const transactionId = searchParams.get('transactionId');

  const handleDownloadPDF = () => {
    const filename = 'ticket.pdf';
    const input = document.getElementById('ticketContent');

    html2canvas(input, { scale: 2 })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a6');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(filename);
      });
  };

  return (
    <>
 
        <div className='about_page_container'>
        <div id="ticketContent" style={styles.container}>
          <h2>Обрані квитки</h2>
          <div style={styles.ticketContainer}>
            <h3>Movie: {movieId}</h3>
            <h3>Seats: {seats.map((seat, index) => (
              <span key={index}>{`(${seat.rowIndex+1}, ${seat.seatIndex+1})`}</span>
            ))}</h3>
            <h3>Price: {price}</h3>
            <h3>Session Date & Time: {sessionId}</h3>
            <h3>Id квитка: {transactionId}</h3>
            <div style={{ height: "auto", margin: "0 auto", maxWidth: 264, width: "100%" }}>
              <QRCode value={transactionId} size={256} />
            </div>
          </div>
          </div>
          <button style={styles.downloadButton} onClick={handleDownloadPDF}>Завантажити PDF</button>
        </div>
      <Footer />
    </>
  );
}

export default Ticket;
