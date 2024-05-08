import React, { useState, useEffect } from 'react';
import '../../App.css';
import Footer from '../Footer';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import UserForm from '../tickets_and_payments/UserForm'; 


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
    <br></br>
    {loggedInUser ? (
        <div className='about_page_container'>
          <div className='user_h2_container'>
            <h3>Акаунт користувача</h3>
          </div>
          <p>Ім'я: {loggedInUser.name}</p>
          <p>Email: {loggedInUser.email}</p>
          <p>ID: {loggedInUser._id}</p>
          <Button variant="danger" onClick={handleLogout}>
            Вийти
          </Button>
          <br></br>
          <Button variant="danger" onClick={DeleteUser}>
            Видалити Акаунт
          </Button>
          <br />
        </div>
      ) : (
        <UserForm onLogin={handleLogin} />
      )}
    <Footer/>
    </>
    
)}