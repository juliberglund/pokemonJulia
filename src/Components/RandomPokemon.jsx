import React, { useState, useEffect } from 'react';
import axios from 'axios';




const RandomPokemon = ({ wildPokemon, infoPokemon,  }) => {


  



  return (
    <>
      <div className="app-wrapper">
        <section className="wild-pokemon">
          <h2>Random Pokemons</h2>
          <div className='image-wrapper'>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${wildPokemon.id}.svg`} className="sprite"
           onClick={() => infoPokemon(wildPokemon)} />


          </div>
          <h3>{wildPokemon.name}</h3>
        </section>
        


      </div>


    </>
  )
}




export default RandomPokemon;