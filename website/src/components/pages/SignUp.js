import React, { useState, useEffect } from 'react';
import '../../App.css';
import Footer from '../Footer';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import UserForm from '../tickets_and_payments/UserForm'; 
import './SignUp.css'

export default function SignUp() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
   
  }, []); 

  const handleLogin = (id) => {
    setLoggedInUser(id);
    localStorage.setItem('loggedInUser', JSON.stringify(id));
  };

  const DeleteUser = () => {
    setLoggedInUser(null);
    localStorage.removeItem('loggedInUser');
    axios.delete(`http://localhost:5555/user/${loggedInUser._id}`)
  .then(response => {
    console.log('User deleted successfully:', response.data);
    // Виконайте додаткові дії за необхідності після успішного видалення користувача
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
            <h1>Акаунт користувача</h1>
          <div className='user_inf'>
          <h3>Ім'я:</h3> <h4>{loggedInUser.name}</h4>
          <h3>Email:</h3> <h4>{loggedInUser.email}</h4>
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
          <UserForm onLogin={handleLogin} />
          </div>
          </div>
        
      )}
    <Footer/>
    </>
    
)}