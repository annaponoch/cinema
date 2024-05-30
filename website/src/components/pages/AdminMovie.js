import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './AdminPanel.css';

const AdminMovie = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [formState, setFormState] = useState({
    title: '',
    format: '',
    genre: '',
    image_URL: '',
    description: '',
    director: '',
    yt_link: ''
  });
  const [imageFile, setImageFile] = useState(null);

  const history = useNavigate(); // Ініціалізація об'єкта історії для переходів

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:5555/movie');
      setMovies(response.data);
    } catch (error) {
      console.error('Помилка отримання списку фільмів:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageURL = formState.image_URL;
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        const uploadResponse = await axios.post('http://localhost:5555/movie/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        imageURL = uploadResponse.data.imageURL;
      }

      const movieData = { ...formState, image_URL: imageURL };

      if (selectedMovie) {
        await axios.put(`http://localhost:5555/movie/${selectedMovie._id}`, movieData);
      } else {
        await axios.post('http://localhost:5555/movie', movieData);
      }
      fetchMovies();
      resetForm();
    } catch (error) {
      console.error('Помилка збереження фільму:', error);
    }
  };

  const handleEdit = (movie) => {
    setSelectedMovie(movie);
    setFormState({
      title: movie.title || '',
      format: movie.format || '',
      genre: movie.genre || '',
      image_URL: movie.image_URL || '',
      description: movie.description || '',
      director: movie.director || '',
      yt_link: movie.yt_link || ''
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5555/movie/${id}`);
      fetchMovies();
    } catch (error) {
      console.error('Помилка видалення фільму:', error);
    }
  };

  const resetForm = () => {
    setFormState({
      title: '',
      format: '',
      genre: '',
      image_URL: '',
      description: '',
      director: '',
      yt_link: ''
    });
    setSelectedMovie(null);
    setImageFile(null);
  };

  // Функція для переходу на сторінку редагування сеансів
  const handleEditSessions = () => {
    history('/admin/sessions'); // Використовуємо історію для переходу на вказаний URL
  };

  return (
    <div className="admin_page">
    <div className="butt_cont"><button className="butt2" onClick={handleEditSessions}>Редагувати сеанси</button></div>
    <div className="admin_page_1"> <div className="admin-panel">
      
      <h1>Панель адміністратора</h1>
      <h2>Фільми</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Назва"
          value={formState.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="format"
          placeholder="Формат"
          value={formState.format}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="genre"
          placeholder="Жанр"
          value={formState.genre}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          required={!selectedMovie}
        />
        <textarea
          name="description"
          placeholder="Опис"
          value={formState.description}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="text"
          name="director"
          placeholder="Режисер"
          value={formState.director}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="yt_link"
          placeholder="Посилання на YouTube"
          value={formState.yt_link}
          onChange={handleChange}
          required
        />
        <div className="butt"><button type="submit">{selectedMovie ? 'Оновити фільм' : 'Додати фільм'}</button></div>
        {selectedMovie && <div className="butt"><button type="button" onClick={resetForm}>Очистити</button></div>}
      </form>
      <table>
        <thead>
          <tr>
            <th>Назва</th>
            <th>Формат</th>
            <th>Жанр</th>
            <th>Режисер</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.format}</td>
              <td>{movie.genre}</td>
              <td>{movie.director}</td>
              <td className="actions">
                <button onClick={() => handleEdit(movie)}>Редагувати</button>
                <button onClick={() => handleDelete(movie._id)}>Видалити</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </div>
  );
};

export default AdminMovie
