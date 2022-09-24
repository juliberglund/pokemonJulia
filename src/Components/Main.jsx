import React, { useEffect} from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import { useState } from "react";

const Main = ({ nextUrl, prevUrl, setUrl, pokeData, loading, setPokeData, }) => {

    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('')
    const [pokeDex, setPokeDex] = useState();



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

    // const clickEsc = () => {
    //     if (Pokeinfo == false ) {

            


    //         setPokeDex(false)
    //     } else {
    //         clickEsc(pokeDex)
            
    //     }
    // }


//   const ref = useRef();
//   useEffect(() => {
//     const checkIfClickOutside = (e) =>{
//         if(pokeDex && ref.current && !ref.current.contains(e.target)){

//             setPokeDex(false);
//         }

//     };
//     document.addEventListener("click", checkIfClickOutside);
  
//     return () => {
//         document.removeaddEventListener("click", checkIfClickOutside);

//     };

//   }, [pokeDex]);
  
  

    

    useEffect(() => {
        filterPokemons()

    }, [search])


    return (
        <>
            <input className="search-input" type="text" placeholder="Search" value={search} onChange={handleSearch} />
            <div className="container">
                <div className="left-content">
                    <Card pokemon={filteredData.length > 0 ? filteredData : pokeData} loading={loading} infoPokemon={poke => setPokeDex(poke)}  />

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
                    {/* hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh */}
                   {    pokeDex && <button className="close" onClick={() => {

                       
                    
                        setPokeDex(null)
                        
                        
                        
                        
                        
                    }}>xxx</button>

                   } 
                   {/* hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh */}
                       
                </div>
            </div>
        </>
    )
}
export default Main;