import React, { useEffect, useState } from 'react';
import Main from './Components/Main';
import './Components/style.css'
import axios from 'axios';
function App() {


  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/")
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();


  const pokeFun = async () => {
    setLoading(true)
    const res = await axios.get(url);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    getPokemon(res.data.results)
    setLoading(false)
  }

  const getPokemon = async (res) => {
    const array = []
    res.forEach(element => {

    });
    for (let i = 0; i < res.length; i++) {
      const result = await axios.get(res[i].url)
      array.push(result.data)
    }


    setPokeData(array);

  }


  useEffect(() => {
    pokeFun();
  }, [url])


  return (
    <>
      {pokeData.length > 0 && <Main loading={loading} pokeData={pokeData} nextUrl={nextUrl} prevUrl={prevUrl} setUrl={setUrl}
        setPokeData={setPokeData}
      />
      }
    </>
  );
}

export default App;