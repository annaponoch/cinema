import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import '../App.css';

function UserForm() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegistering) {
      // Реєстрація нового користувача
      try {
        const response = await axios.post(`http://localhost:5555/user`, { name, email, password });
        console.log(response.data);
        console.log('Registration done');
      } catch (error) {
        console.error('Registration error:', error.response.data.message);
      }
    } else {
      // Авторизація користувача
      try {
        const response = await axios.post(`http://localhost:5555/user/login`, { email, password });
        console.log(response.data);
        console.log('Log in done');
      } catch (error) {
        console.error('Login error:', error.response.data.message);
      }
    }
  };

  return (
    <div className='about_page_container'>
      <h1>Дані покупця</h1>
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
      <br />
      <Button variant="link" onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'У мене вже є акаунт' : 'Зареєструватись'}
      </Button>
    </div>
  );
}

export default UserForm;
