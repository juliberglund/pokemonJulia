import React, { useEffect, useState } from "react";
import Card from "./Components/Card";
import Pokeinfo from "./Components/Pokeinfo";
import RandomPokemon from "./Components/RandomPokemon";
import {ScrollView} from 'react-native';
import axios from "axios";

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>

const Main = ({ catchedPokemons, setCatchedPokemons }) => {

        const [filteredData, setFilteredData] = useState([]);
        const [search, setSearch] = useState('')
        const [pokeDex, setPokeDex] = useState();
        const [wildPokemon, setWildPokemon] = useState({});
        const [loading, setLoading] = useState(true);
        const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/")
        const [nextUrl, setNextUrl] = useState();
        const [prevUrl, setPrevUrl] = useState();
        const [pokeData, setPokeData] = useState([]);

        const pokeFun = async () => {
            setLoading(true)
            const res = await axios.get(url);
            setNextUrl(res.data.next);
            setPrevUrl(res.data.previous);
            getPokemon(res.data.results)
            setLoading(false)

        }

        //Tar fram alla pokemons på sidan via en array
        const getPokemon = async (res) => {
            const array = []
            res.forEach(element => {
        
            });
            for (let i = 0; i < res.length; i++) {
            const result = await axios.get(res[i].url)
            array.push(result.data)
            }
        
            setPokeData(array);
            encounterWildPokemon(array);
        }

        const handleSearch = (e) => {
            setSearch(e.target.value);
        }

        //Sökfunktionen som sorterar pokemons namnen, tar fram den pokemon du sökt på.
        const filterPokemons = () => {
        if (search.length > 1) {
            const pokemons = pokeData.filter(pok => pok.name.includes(search))
            setFilteredData(pokemons)
            } else {
                setFilteredData(pokeData);
            }
        }
    

        //tar fram de randompokemonen som ligger till vänster på sidan
        const encounterWildPokemon = (array) => {
            const RandomPokemon = array[Math.floor(Math.random() * pokeData.length)];

            setWildPokemon(RandomPokemon);
        }

        //funktionen till knappen som släpper pokemonsen efter du fångat de.
        const releasePokemon = id => {
            setCatchedPokemons(state => state.filter(p => p.id !== id))
        }
   
        //funktionen till knappen Catch, som tar och sparar pokemonen till vänster på sidan
        const catchPokemon = (pokemon) => {
            setCatchedPokemons(state => {
            const pomonExists = (state.filter(p => pokemon.id === p.id).length > 0);
        
            if (!pomonExists) {
                state = [...state, pokemon]
                state.sort(function (a, b) {
                return a.id - b.id
                })
            }
            return state
            })
            //Samt tar fram en ny random pokemon
            encounterWildPokemon(pokeData);
        }
    
        //Sökfuntionen att söka på pokemonsen  fungerar
        useEffect(() => {
            
            filterPokemons()

        }, [search])


        //Så att de catchade pokemonsen sparas när du byter url
        useEffect(() => {
            pokeFun();
        }, [url])

        return (
            <>  
            <div className="scroll">
            <input className="search-input" type="text" placeholder="Search" value={search} onChange={handleSearch} />

            {/* -----------Om wildpokemon finns kan du klicka på bilden och får fram information om den pokemonen  */}
            {wildPokemon && <RandomPokemon wildPokemon={wildPokemon} infoPokemon={poke => setPokeDex(poke)} />}

            <button className='random-pokemon' onClick={()=>encounterWildPokemon(pokeData)}>Refresh</button>
            { catchedPokemons.map((item) => {
                        
                return (
                            //Klickar på info så öppnas  'right content'   
                            <div className="card" key={item.id} >
                            <button onClick={() => releasePokemon(item.id)}>X</button>
                                <h2>{item.id}</h2>
                                <img src={item.sprites.front_default} alt="" />
                                <h2>{item.name}</h2>
                            </div> 
                        )
                    })
                }
            <div className="container">
                <div className="left-content">
                    <Card pokemon={filteredData.length > 0 ? filteredData : pokeData} loading={loading} infoPokemon={poke => setPokeDex(poke)} />

                    <div className="btn-group">
                        {prevUrl && <button onClick={() => {
                            setPokeData([])
                            setFilteredData([])
                            setSearch('')
                            setUrl(prevUrl)
                        }}>Previous</button>}

                        {nextUrl && <button onClick={() => {
                            setPokeData([])
                            setFilteredData([])
                            setSearch('')
                            setUrl(nextUrl)
                        }}>Next</button>}
                    </div>
                </div>
                
                <div className="right-content">
                    <Pokeinfo catchPokemon = {catchPokemon} data={pokeDex} />
                    {pokeDex && <button className="close" onClick={() => 
                    {setPokeDex(null)}}>Close</button>
                    } 
                </div>
                </div>
                </div>
        </>
    )
}
export default Main;