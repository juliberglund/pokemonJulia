import React, { useEffect, useState } from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import RandomPokemon from "./RandomPokemon";


const Main = ({ nextUrl, prevUrl, setUrl, pokeData, loading, setPokeData }) => {

    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('')
    const [pokeDex, setPokeDex] = useState();
    const [wildPokemon, setWildPokemon] = useState({});
    const [bookmarkedData, setBookmarkedData] = useState([]);
    const [catchedPokemons, setCatchedPokemons] = useState([]);



    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    const filterPokemons = () => {
        if (search.length > 1) {
            const pokemons = pokeData.filter(pok => pok.name.includes(search))
            setFilteredData(pokemons)
        } else {
            setFilteredData(pokeData);
        }
    }
    


    const encounterWildPokemon = () => {
        const RandomPokemon = pokeData[Math.floor(Math.random() * pokeData.length)];

        setWildPokemon(RandomPokemon);
    }

   
    const releasePokemon = id => {
        setCatchedPokemons(state => state.filter(p => p.id !== id))
      }
    
    
   

    const catchPokemon = (pokemon) => {
        setCatchedPokemons(state => {
          const pomonExists = (state.filter(p => pokemon.id == p.id).length > 0);
    
          if (!pomonExists) {
            state = [...state, pokemon]
            state.sort(function (a, b) {
              return a.id - b.id
            })
          }
          return state
        })
        console.log(catchedPokemons);
        encounterWildPokemon()
      }
    





    useEffect(() => {
        
        filterPokemons()
        encounterWildPokemon()

    }, [search])


   

    return (
        <>


            <input className="search-input" type="text" placeholder="Search" value={search} onChange={handleSearch} />


            {/* När man klickar här får man fram alla sparade */}
            {/* <button className="bookmarks" onClick={bookmarksSave}>Bookmarks</button>  */}

           



            {wildPokemon && <RandomPokemon wildPokemon={wildPokemon} infoPokemon={poke => setPokeDex(poke)} />}

            <button className='random-pokemon' onClick={encounterWildPokemon}>Refresh</button>
            { catchedPokemons.map((item) => {
                        
                return (
                            //Klickar på kortet så öppnas infon 'right content'
                         
                            
                            <div className="card" key={item.id} >
                            <button onClick={() => releasePokemon(item.id)}>Release</button>
                                <h2>{item.id}</h2>
                                <img src={item.sprites.front_default} alt="" />
                                <h2>{item.name}</h2>
                            </div> 
                            
                           // <button className="catch-btn" onClick={() => catchPokemon(wildPokemon)}>CATCH</button>


                        )


                    
                })}
           

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
                    {pokeDex && <button className="close" onClick={() => {

                        setPokeDex(null)

                    }}>xxx</button>
                    

                    }
                    


                </div>




            </div>
        </>
    )
}
export default Main;