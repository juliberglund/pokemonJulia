import React, { useEffect, useState } from 'react';
import Main from './Components/Main';
import './Components/style.css'
import axios from 'axios';
function App() {

  const [catchedPokemons, setCatchedPokemons] = useState([]);



 


 

  


  return (
    <>
      <Main catchedPokemons={catchedPokemons} setCatchedPokemons={setCatchedPokemons}/>
      
    </>
  );
}

export default App;