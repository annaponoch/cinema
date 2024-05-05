import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SeatPopup from '../SeatPopup';
import Footer from '../Footer';
import Modal from 'react-bootstrap/Modal';

function SessionPage() {
  const { movieId, date } = useParams();
  const [movie, setMovie] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Отримання даних про фільм
    axios.get(`http://localhost:5555/movie/movie_id/${movieId}`)
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => {
        console.error('Error fetching movie:', error);
      });

    // Отримання даних про сеанси
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
    setShowModal(true); // Відкриття модального вікна при натисканні на кнопку сеансу
  };

  if (!movie || !sessions) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{movie.title}</h2>
      <img src={movie.image_URL} alt={movie.title} />
      <p>Director: {movie.director}</p>
      <p>Description: {movie.description}</p>
      <h3>Sessions:</h3>
      <ul>
        {sessions.map(session => (
          <li key={session._id}>
            <button onClick={() => handleSessionClick(session)}>
              {session.date_time.split('T')[1].substring(0, 5)}
            </button>
          </li>
        ))}
      </ul>
      <Footer/>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Seat Selection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {selectedSession && (
          <SeatPopup 
            seats={JSON.parse(selectedSession.seats[0])} 
            price={selectedSession.price} 
            sessionId={selectedSession._id}
            movieId={movie.movie_id} // Додаємо ідентифікатор сеансу
          />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default SessionPage;
