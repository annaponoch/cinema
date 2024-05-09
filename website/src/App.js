import './App.css';
import Navigation from './components/Navbar';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Home from './components/pages/Home';
import About from './components/pages/About';
import SignUp from './components/pages/SignUp';
import SessionPage from './components/pages/SessionPage'; 
import PayForTicket from './components/pages/PayForTicket';
import Ticket from './components/pages/Ticket.js'

function App() {
  console.log('Running');
  return (
    <>
      <Router>
        <Navigation />
        <Routes> 
          <Route path='/' element={<Home />} /> 
          <Route path='/About' element={<About />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/pay' element={<PayForTicket />} />
          <Route path='/ticket' element={<Ticket />} />
          <Route path='/session/:movieId/:date' element={<SessionPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
