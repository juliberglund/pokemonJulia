import React from "react";

const Card = ({ pokemon, loading, infoPokemon, handleShow, handleClose  }) => {
    //Korten som används till pokemonsen, bild och klickfunktionen.
    return (
        <>
            {
                loading ? <h1>Loading pokemons...</h1> :
                    pokemon.map((item) => {
                        return (
                            //Klickar på kortet så öppnas infon 'right content'
                            // infoPokemon={poke => setPokeDex(poke)} />

                            <div className="card" key={item.id}>
                                <h2>{item.id}</h2>
                                <img src={item.sprites.front_default} alt="" />
                                <button className="info" onClick={()  => infoPokemon(item)}>Info</button>
                                {/* <button onClick= {e => myBooleanCondition ? handleShow(e) : handleClose (e)}> Add Todo </button>  */}
                                <h2>{item.name}</h2>
                            </div> 
                        )
                    })
            }
        </>
    )
}

export default Card;