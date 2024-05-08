import React, { useState, useEffect } from 'react';
import '../../App.css';
import Footer from '../Footer';
import { useLocation } from 'react-router-dom';
import QRCode from "react-qr-code";


function Ticket() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const seats = JSON.parse(searchParams.get('seats'));
  const price = searchParams.get('totalPrice');
  const sessionId = searchParams.get('sessionId');
  const movieId = searchParams.get('movieId');
  const transactionId = searchParams.get('transactionId');

  return (
    <>
  <div className='about_page_container'>
          <h2>Обрані квитки</h2>
          <h3>Movie: {movieId}</h3>
          {/* <img src={movie.image_URL} alt={movie.title} /> */}
          <h3>Seats: {seats.map((seat, index) => (
              <span key={index}>{`(${seat.rowIndex+1}, ${seat.seatIndex+1})`}</span>
            ))}</h3>
          <h3>Price: {price}</h3>
          <h3>Session Date & Time: {sessionId}</h3>
          <h3>Id квитка {transactionId}</h3>
          <div style={{ height: "auto", margin: "0 auto", maxWidth: 264, width: "100%" }}>
              <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={transactionId}
              viewBox={`0 0 256 256`}
              />
          </div>
    </div>
    <Footer/>
    
    </>
  );
}

export default Ticket;