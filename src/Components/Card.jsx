import React from "react";
import { useState } from "react";
const Card = ({ pokemon, loading, infoPokemon }) => {


    
    return (
        <>
            {
                loading ? <h1>Loading pokemons...</h1> :
                    pokemon.map((item) => {
                        return (
                            //Klickar på kortet så öppnas infon 'right content'
                         
                            
                            <div className="card" key={item.id} onClick={() => infoPokemon(item)}>
                                <h2>{item.id}</h2>
                                <img src={item.sprites.front_default} alt="" />
                                <h2>{item.name}</h2>
                            </div> 
                            


                        )
                    })
            }

        </>
    )
    
}


export default Card;