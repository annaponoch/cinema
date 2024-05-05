import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import '../App.css';

function UserForm({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userId, setUserId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegistering) {
      try {
        const response = await axios.post(`http://localhost:5555/user`, { name, email, password });
        setSuccessMessage('Реєстрація успішна!');
        setErrorMessage('');
        console.log(userId);
        setUserId(response.data._id); // Зберігаємо _id користувача після реєстрації
        onLogin(response.data._id); // Передаємо _id у батьківський компонент
      } catch (error) {
        setSuccessMessage('');
        setErrorMessage('Помилка реєстрації: ' + error.response.data.message);
      }
    } else {
      try {
        const response = await axios.post(`http://localhost:5555/user/login`, { email, password });
        setSuccessMessage('Авторизація успішна!');
        setErrorMessage('');
        setUserId(response.data._id); // Зберігаємо _id користувача після авторизації
        onLogin(response.data._id); // Передаємо _id у батьківський компонент
      } catch (error) {
        setSuccessMessage('');
        setErrorMessage('Помилка авторизації: ' + error.response.data.message);
      }
    }
  };

  return (
    <div className='about_page_container'>
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
          <Button variant="dark" type="submit">
            {isRegistering ? 'Зареєструватись' : 'Авторизуватись'}
          </Button>
        </Form>
      )}
      {!successMessage && (
        <Button variant="link" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'У мене вже є акаунт' : 'Зареєструватись'}
        </Button>
      )}
    </div>
  );
}

export default UserForm;
