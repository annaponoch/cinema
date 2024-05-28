import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SeatPopup from '../tickets_and_payments/SeatPopup';
import Footer from '../Footer';
import Modal from 'react-bootstrap/Modal';
import './Session.css'

function SessionPage() {
  const { movieId, date } = useParams();
  const [movie, setMovie] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5555/movie/movie_id/${movieId}`)
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => {
        console.error('Error fetching movie:', error);
      });
    axios.get(`http://localhost:5555/session/movie/${movieId}/${date}`)
      .then(response => {
        setSessions(response.data);
      })
      .catch(error => {
        console.error('Error fetching sessions:', error);
      });
  }, [movieId, date]);

  const handleSessionClick = (session) => {
    setSelectedSession(session);
    setShowModal(true); 
  };

  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'long', day: 'numeric' };
    return date.toLocaleDateString('uk-UA', options);
  };


  if (!movie || !sessions) {
    return <div className='loading'>Loading...</div>;
  }

  return (
    <>
    <div className='session_page'>
      <div className='movie_container'>
       {/* FOR IMG AND DETAILS */}
        <div className='first_row'>
          <img
              className='image'
              alt={movie.title}
              src={movie.image_URL}
            />

          <div className='details'>
          <h2>{movie.title}</h2>
          <div className='format'>
          <h3>{movie.format}</h3>
          </div>
          <h3>{getFormattedDate(date)}</h3>
          <div className='buttons_container'>
          {sessions.map(session => (
                <button className='button_time' onClick={() => handleSessionClick(session)}>
                  <h3>{session.date_time.split('T')[1].substring(0, 5)}</h3>
                </button>
            ))}
          </div>
          <h4>Режисер:</h4>
          <h3>{movie.director}</h3>
          <h4>Жанр:</h4>
          <h3>{movie.genre}</h3>
          </div>

        </div>
        {/* FOR DESCRIPTION */}
        <div className='second_row'>
          <div className='description_text'>
            <h3>Опис фільму</h3>
            <h4>{movie.description}</h4>
          </div>
        </div>
      </div>
      
    </div>
    <Footer/>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Оберіть місця</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {selectedSession && (
          <SeatPopup 
            seats={JSON.parse(selectedSession.seats[0])} 
            price={selectedSession.price} 
            sessionId={selectedSession._id}
            movieId={movie.movie_id} 
          />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SessionPage;
