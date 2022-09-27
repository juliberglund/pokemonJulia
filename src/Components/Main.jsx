import React, { useEffect, useState } from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import RandomPokemon from "./RandomPokemon";


const Main = ({ nextUrl, prevUrl, setUrl, pokeData, loading, setPokeData }) => {

    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('')
    const [pokeDex, setPokeDex] = useState();
    const [wildPokemon, setWildPokemon] = useState({});







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
    //


    const encounterWildPokemon = () => {
        console.log(pokeData);
        const RandomPokemon = pokeData[Math.floor(Math.random() * pokeData.length)];
        console.log(RandomPokemon);
        setWildPokemon(RandomPokemon);
    }

    //


    useEffect(() => {
        filterPokemons()
        encounterWildPokemon()

    }, [search])


    //   const btnRandomPoke = () { 
    //      Denna knapp ska ligga i hörnet & ska ta fram hela app-wrapper när man klickar på den.
    //   }


    return (
        <>
            {/* Knapp klickas så fälls wildpoke in */}
            <button className='random-poke'>RandomPokemon</button>
            <button className='random-poke' onClick={encounterWildPokemon}>Choose another random pokemon</button>


            <input className="search-input" type="text" placeholder="Search" value={search} onChange={handleSearch} />

            {wildPokemon && <RandomPokemon wildPokemon={wildPokemon} infoPokemon={poke => setPokeDex(poke)} />}
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
                    <Pokeinfo data={pokeDex} />
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