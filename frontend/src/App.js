import './App.css';
import React, { useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(()=>{
    axios.get('http://localhost:5555/books').then(
      Response => console.log(Response)
    )
  })


  return (
    <div>
      test
    </div>
  );
}

export default App;
