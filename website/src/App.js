import './App.css';
import Navbar from './components/Navbar';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Виправлено імпорт
import Home from './components/pages/Home';
import About from './components/pages/About';
import SignUp from './components/pages/SignUp';
import SessionPage from './components/pages/SessionPage'; // Додано імпорт

function App() {
  console.log('Running');
  return (
    <>
      <Router>
        <Navbar />
        <Routes> {/* Виправлено тег на Routes */}
          <Route path='/' element={<Home />} /> {/* Виправлено синтаксис */}
          <Route path='/About' element={<About />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/session/:movieId/:date' element={<SessionPage />} />
        </Routes> {/* Виправлено закриваючий тег */}
      </Router>
    </>
  );
}

export default App;
