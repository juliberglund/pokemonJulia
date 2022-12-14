import React, { useEffect, useState } from "react";
import Card from "./Components/Card";
import Pokeinfo from "./Components/Pokeinfo";
import RandomPokemon from "./Components/RandomPokemon";
import axios from "axios";
import { AiFillCloseSquare } from "react-icons/ai";
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>
const Main = ({ catchedPokemons, setCatchedPokemons}) => {

        const [filteredData, setFilteredData] = useState([]);
        const [search, setSearch] = useState('')
        const [pokeDex, setPokeDex] = useState();
        const [wildPokemon, setWildPokemon] = useState({});
        const [loading, setLoading] = useState(true);
        const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
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

        const formatPoke = (res) => {
            const data = [{...res}]
            setFilteredData(data)
        }


        //Så när du skriver i sökrutan försöker den kalla på aipet men om den retuernerar error så kommer catch(error) ta över.
        const handleSearch =async (e) => {
            try {
                setSearch(e.target.value);
                if (!e.target.value) {
                    return setFilteredData(pokeData);
                }
                setLoading(true)
                const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${e.target.value}/`)
                formatPoke(res.data)
                setLoading(false)
                
            } catch (error) {
                setLoading(false)
                if (error.response.status === 404) {
                    filterPokemons()
                }
            }
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

      
     const heya = () => {
       if (pokeDex !== undefined && pokeDex != null) {        
        document.getElementById('blah').focus();
        document.getElementById('blah').style.display = 'inline-block';
        document.getElementById('inblah').style.display = 'block'
        document.getElementById('b').style.display = 'block';
        document.getElementById('full').style.pointerEvents = 'none';
        document.getElementById('inblah').style.borderWidth = '1px solid black'        
        
        
       } else if(pokeDex === null){
        document.getElementById('inblah').style.display = 'none';
        document.getElementById('blah').style.display = 'none';
        document.getElementById('b').style.display = 'none';
        document.getElementById('full').style.pointerEvents = 'auto';
       }
    } 

        return (
            <>  
            {heya()}
            <div className="scroll" style={{position: 'relative', pointerEvents: 'auto'}} id="full">
            <input className="search-input" type="text" placeholder="Search" value={search} onChange={handleSearch} />

            {/* -----------Om wildpokemon finns kan du klicka på bilden och får fram information om den pokemonen  */}
            {Object.values(wildPokemon).length > 0 && <RandomPokemon wildPokemon={wildPokemon} infoPokemon={poke => setPokeDex(poke)} />}
            
            {Object.values(wildPokemon).length > 0 && <button className='random-pokemon' onClick={()=>encounterWildPokemon(pokeData)}>Refresh</button>}
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

                   {(filteredData.length > 0 || pokeData.length > 0 ) &&<div className="btn-group">
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
                    </div>} 
                </div>
                
                <div style={{position: 'absolute',bottom: '50%',marginRight: 'auto',marginLeft: 'auto',width: 'auto', height: 'auto', backgroundColor: 'transparent',position:'fixed', padding: 20, top: '10%', left: '50%',transform: 'translate(-50%, 0)', pointerEvents: 'none'}} id="blah">
                    <div style={{width: 'auto', height: 'auto',backgroundColor:'white', pointerEvents: 'all', padding: 10, borderWidth: '2px', display: 'none'}} id="inblah">
                        <div style={{width: 'auto', height: 'auto', backgroundColor: 'red'}} id='b'>
                    {pokeDex && <AiFillCloseSquare onClick={() => 
                        {setPokeDex(null)}} size={30} style={{float: 'left'}} />
                        }</div>
                        <Pokeinfo catchPokemon = {catchPokemon} data={pokeDex} />
                    </div>
                </div>
                </div>
                </div>
        </>
    )
}
export default Main;