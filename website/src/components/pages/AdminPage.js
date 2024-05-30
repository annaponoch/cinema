import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import Footer from '../Footer';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import AdminForm from '../tickets_and_payments/AdminForm'; 
import './SignUp.css'

export default function SignUp() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
      if (!loggedInUser) {
        navigate('/admin/movie');
      }
    }
  }, [loggedInUser, navigate]);

  const handleLogin = (id) => {
    setLoggedInUser(id);
    localStorage.setItem('loggedInUser', JSON.stringify(id));
    navigate('/admin/movie');
  };

  const DeleteUser = () => {
    setLoggedInUser(null);
    localStorage.removeItem('loggedInUser');
    axios.delete(`http://localhost:5555/user/${loggedInUser._id}`)
      .then(response => {
        console.log('User deleted successfully:', response.data);
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('loggedInUser');
  };


  return(
    <>
    {loggedInUser ? (
        <div className='sign_page'>
          <div className='sign_up'>
            <h1>Адмін акаунт</h1>
          <div className='user_inf'>
            <Button variant="danger" onClick={handleLogout}>
              Вийти
            </Button>
            <br></br>
            <Button variant="danger" onClick={DeleteUser}>
              Видалити Акаунт
            </Button>
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
    <Footer/>
    </>
    
)}
