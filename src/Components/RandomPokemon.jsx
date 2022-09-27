import React, {useState, useEffect} from 'react';
import axios from 'axios';




const RandomPokemon = ({ wildPokemon}) => {


    const [pokedex, setPokedex] = useState([]);
    
      

      
    
      const catchPokemon = (pokemon) => {
        setPokedex(state => {
          const monExists = (state.filter(p => pokemon.id === p.id).length > 0);
    
          if (!monExists) {
            state = [...state, pokemon]
            state.sort(function (a, b) {
              return a.id - b.id
            })
          }
          return state
        })
        // encounterWildPokemon()
      }
    
      const releasePokemon = id => {
        setPokedex(state => state.filter(p => p.id !== id))
      }

      //Refresh knapppen

  
    
      return (
        <>
           <div className="app-wrapper">
                  <section className="wild-pokemon">
                      <h2>Wild Encounter</h2>
                      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${wildPokemon.id}.svg`} className="sprite" />
                      <h3>{wildPokemon.name}</h3>
                      {/* <button className="catch-btn" onClick={() => catchPokemon(wildPokemon)}>CATCH</button> */}
                      {/* <button className='refresh-btn' onClick={() => pokeId(Math.random())} >Refresh</button> */}
                  </section>

                  <section className="pokedex">

                      <div className="pokedex-list">
                          {pokedex.map(pokemon => (
                              <div className="pokemon" key={pokemon.id}>

                                  <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`} className="sprite-catch" />
                                  {/* Lägga in så när man klickar på bilden som är catchad så kommer infon upp */}
                                  <h3 className="pokemon-name">{pokemon.name}</h3>
                                  <button className="remove" onClick={() => releasePokemon(pokemon.id)}>&times;</button>
                              </div>
                          ))}
                      </div>
                  </section>
              </div>

         
        </>
      )
    }




export default RandomPokemon;