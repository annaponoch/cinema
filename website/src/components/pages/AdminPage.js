import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import Footer from '../Footer';
// import axios from 'axios';
import Button from 'react-bootstrap/Button';
import AdminForm from '../tickets_and_payments/AdminForm'; 
import './SignUp.css';

export default function SignUp() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setLoggedInUser(user);

      if (user.email !== 'admin_zironka@gmail.com') {
        navigate('/'); // Перенаправлення на головну сторінку, якщо користувач не адмін
      } else {
        navigate('/admin/movie'); // Перенаправлення на сторінку /admin/movie, якщо користувач адмін
      }
    }
  }, [navigate]);

  const handleLogin = (user) => {
    if (user.email === 'admin_zironka@gmail.com') {
      setLoggedInUser(user);
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      navigate('/admin/movie');
    } else {
      alert('Ви не маєте доступу до адмін панелі');
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

  return (
    <>
      {loggedInUser ? (
        <div className='sign_page'>
          <div className='sign_up'>
            <h1>Адмін акаунт</h1>
            <div className='user_inf'>
              <Button variant="danger" onClick={handleLogout}>
                Вийти
              </Button>
              <br />
            </div>
          </div>
        </div>
      ) : (
        <div className='sign_page'>
          <div className='sign_up'>
            <AdminForm onLogin={handleLogin} />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
