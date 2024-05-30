import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Імпорт бібліотеки для роботи з історією переходів
import './UserForm.css';

function AdminForm({ onLogin, loggedInUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useNavigate(); // Ініціалізація об'єкта історії для переходів

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { 
      const response = await axios.post(`http://localhost:5555/user/login`, { email, password });
      if (email === 'admin_zironka@gmail.com') {
        onLogin(response.data);
        history('/admin/sessions'); // Перенаправлення на сторінку редагування сеансів для адміністратора
      } else {
        setErrorMessage('Ви не маєте доступу до цієї сторінки.');
      }
    } catch (error) {
      setErrorMessage('Помилка авторизації: ' + error.response.data.message);
    }
  };

  const handleLogout = () => {
    onLogin(null); 
  };

  return (
    <>
      <div className='user_h2_container'>
        <h2 >Адмін акаунт</h2>
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
          {errorMessage && (
            <Alert variant="danger">
              {errorMessage}
            </Alert>
          )}
          <div className="form-container">
            <Form className="form" size='70%' onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email-адреса</Form.Label>
                <Form.Control type="email" placeholder="Введіть email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control type="password" placeholder="Введіть пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>
              <div className="button_contr">
                <Button className="button_user" variant="dark" type="submit">
                  Авторизуватись
                </Button>
              </div>
            </Form>           
          </div>
        </>
      )}
    </>
  );
}

export default AdminForm;
