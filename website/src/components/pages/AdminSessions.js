import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import './AdminPanel.css';

const AdminSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [formState, setFormState] = useState({
    movie_id: '',
    date_time: '',
    price: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState(null);

  const history = useNavigate();

  useEffect(() => {
    fetchSessions();
    fetchMovies();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await axios.get('http://localhost:5555/session');
      const sortedSessions = response.data.sort((a, b) => {
        const dateA = new Date(a.date_time).toLocaleDateString();
        const dateB = new Date(b.date_time).toLocaleDateString();
        if (dateA === dateB) {
          return String(a.movie_id).localeCompare(String(b.movie_id));
        }
        return new Date(a.date_time) - new Date(b.date_time);
      });
      setSessions(sortedSessions);
    } catch (error) {
      console.error('Помилка отримання сеансів:', error);
    }
  };

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:5555/movie');
      setMovies(response.data);
    } catch (error) {
      console.error('Помилка отримання фільмів:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const date_time = new Date(formState.date_time).toISOString();
      const newSession = { ...formState, date_time };

      if (selectedSession) {
        await axios.put(`http://localhost:5555/session/${selectedSession._id}`, newSession);
      } else {
        await axios.post('http://localhost:5555/session', newSession);
      }

      fetchSessions();
      resetForm();
    } catch (error) {
      console.error('Помилка збереження сеансу:', error);
    }
  };

  const handleEdit = (session) => {

    const localDateTime = new Date(session.date_time).toLocaleString("sv-SE", {
      timeZone: "UTC",
      hour12: false
    }).replace(" ", "T");

    setSelectedSession(session);
    setFormState({
      movie_id: session.movie_id || '',
      date_time: localDateTime,
      price: session.price || ''
    });
    window.scrollTo(0, 0);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5555/session/${sessionToDelete}`);
      setShowModal(false);
      setSessionToDelete(null);
      fetchSessions();
    } catch (error) {
      console.error('Помилка видалення сеансу:', error);
    }
  };

  const resetForm = () => {
    setFormState({
      movie_id: '',
      date_time: '',
      price: ''
    });
    setSelectedSession(null);
  };

  const handleEditSessions = () => {
    history('/admin/movie');
  };

  const handleShowModal = (session) => {
    setSelectedSession(session);
    setSessionToDelete(session._id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSessionToDelete(null);
  };

  return (
    <div className="admin_page">
      <div className="butt_cont">
        <button className="butt2" onClick={handleEditSessions}>Редагувати фільми</button>
      </div>
      <div className="admin_page_1">
        <div className="admin-panel">
          <h1>Панель адміністратора</h1>
          <h2>Сеанси</h2>
          <form onSubmit={handleSubmit}>
            <select
              name="movie_id"
              value={formState.movie_id}
              onChange={handleChange}
              required
            >
              <option value="">Виберіть фільм</option>
              {movies.map((movie) => (
                <option key={movie._id} value={movie.movie_id}>
                  {movie.title}
                </option>
              ))}
            </select>
            <input
              type="datetime-local"
              name="date_time"
              placeholder="Дата та час"
              value={formState.date_time}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Ціна"
              value={formState.price}
              onChange={handleChange}
              required
            />
            <div className="butt">
              <button type="submit">{selectedSession ? 'Оновити сеанс' : 'Додати сеанс'}</button>
            </div>
            {selectedSession && <div className="butt"><button type="button" onClick={resetForm}>Очистити</button></div>}
          </form>
          <table>
            <thead>
              <tr>
                <th>Назва фільму</th>
                <th>Дата та час</th>
                <th>Ціна</th>
                <th>Дії</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr key={session._id}>
                  <td>{movies.find((movie) => movie.movie_id === session.movie_id)?.title || session.movie_id}</td>
                  <td>{new Date(session.date_time).toLocaleString("uk-UA", { timeZone: "UTC" })}</td>
                  <td>{session.price}</td>
                  <td className="actions">
                    <button onClick={() => handleEdit(session)}>Редагувати</button>
                    <button onClick={() => handleShowModal(session)}>Видалити</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Підтвердження видалення</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Ви точно бажаєте видалити сеанс фільму "{movies.find(movie => movie.movie_id === selectedSession?.movie_id)?.title}"?
          <br />
          Дата та час: {selectedSession ? `${new Date(selectedSession.date_time).toLocaleString("uk-UA", { timeZone: "UTC" })}` : ''}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Відмінити
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Видалити
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminSessions;
