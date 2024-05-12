import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import './UserForm.css';

function UserForm({ onLogin, loggedInUser }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegistering) {
      try {
        const response = await axios.post(`http://localhost:5555/user`, { name, email, password });
        setSuccessMessage('Реєстрація успішна!');
        setErrorMessage('');
        onLogin(response.data); // Передаємо дані користувача у батьківський компонент
      } catch (error) {
        setSuccessMessage('');
        setErrorMessage('Помилка реєстрації: ' + error.response.data.message);
      }
    } else {
      try {
        const response = await axios.post(`http://localhost:5555/user/login`, { email, password });
        setSuccessMessage('Авторизація успішна!');
        setErrorMessage('');
        onLogin(response.data); // Передаємо дані користувача у батьківський компонент
      } catch (error) {
        setSuccessMessage('');
        setErrorMessage('Помилка авторизації: ' + error.response.data.message);
      }
    }
  };

  const handleLogout = () => {
    onLogin(null); // Передаємо null у батьківський компонент, щоб затерти дані про користувача
  };

  return (
    <>
      <div className='user_h2_container'>
        <h2 >Дані користувача</h2>
      </div>
      {loggedInUser ? (
        <div>
          <p>Ім'я: {loggedInUser.name}</p>
          <p>Email: {loggedInUser.email}</p>
          <Button variant="danger" onClick={handleLogout}>
            Вийти
          </Button>
        </div>
      ) : (
        <>
          {successMessage && (
            <Alert variant="success">
              {successMessage}
            </Alert>
          )}
          {errorMessage && (
            <Alert variant="danger">
              {errorMessage}
            </Alert>
          )}
          <div className="form-container">
          {!successMessage && (           
            <Form className="form" size='70%' onSubmit={handleSubmit}>
              {isRegistering && (
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Прізвище, ім'я</Form.Label>
                  <Form.Control type="text" placeholder="Введіть ПІ" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
              )}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email-адреса</Form.Label>
                <Form.Control type="text" placeholder="Введіть email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control type="password" placeholder="Введіть пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>
              <div className="button_contr">
              <Button className="button_user" variant="dark" type="submit">
                {isRegistering ? 'Зареєструватись' : 'Авторизуватись'}
              </Button>
              {!successMessage && (
              <Button variant="link" onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? 'У мене вже є акаунт' : 'Зареєструватись'}
              </Button>
            )}
              </div>
            </Form>           
          )}
        </div>
        </>
      )}</>
  );
}

export default UserForm;
