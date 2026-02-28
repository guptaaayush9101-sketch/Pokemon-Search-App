import { useEffect, useState } from "react"
import { PokemonCards } from "./PokemonCards";
import "./index.css"

export const Pokemon = () => {
    const[pokemon,setPokemon] = useState([]);
    const[loading,setLoading] = useState(false);
    const[error,setError] = useState(null);
    const[search,setSearch] = useState("");
    const fetchPokemon = async() => {
        const API = "https://pokeapi.co/api/v2/pokemon?limit=124";
        try {
            setLoading(true);
            const res = await fetch(API);
            if (!res.ok) {
   throw new Error("Failed to fetch Pokémon");
}
            const data = await res.json();
            console.log(data);

            const detailedPokemonData = data.results.map( async (curPokemon) => {
                const res = await fetch(curPokemon.url);
                const data = await res.json();
                return data;
                
            })
            console.log(detailedPokemonData)
            const detailedResponses = await Promise.all(detailedPokemonData);
            console.log(detailedResponses);
            setPokemon(detailedResponses);
           
        } catch (error) {
            console.log(error);
            setError(error);
        }
        finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchPokemon();
    },[]);

    const filteredPokemon = pokemon.filter((curPokemon) =>
  curPokemon.name.toLowerCase().includes(search.toLowerCase())
);

    if (loading) {
        return(
        <div className="loading">
             <h2> Your Pokemon Search Begins Soon!</h2>
        </div>
        )
     
}
if (error) {
   return <h2 style={{ color: "red" }}>Error: {error.message}</h2>;
}
const handleInputChange = (e) => {
    setSearch(e.target.value);
}
    return(
        <>
        <section>
            <header>
               
                    <h1 className="color-heading">
                    lets catch pokemon!!
                </h1>   
               
                
                <div className="pokemon-search">
                    <input 
                    type="text" 
                    placeholder="Enter Your Pokemon"
                    value={search}
                    onChange={handleInputChange}    
                    />
                </div>
            </header>
            <div>
                <ul className="cards">
                    
                    {/* {pokemon.map((curPokemon)=> { */}
                         {/* return <li key={curPokemon.id}>
                            {curPokemon.name}
                         </li> */}
                        {/* return <PokemonCards key={curPokemon.id} pokemonData = {curPokemon}/> */}
                        {filteredPokemon.length === 0 ? (
  <h2 className=" not-found">
    I haven't caught this Pokémon yet!
  </h2>
) : (
  filteredPokemon.map((curPokemon) => (
    <PokemonCards
      key={curPokemon.id}
      pokemonData={curPokemon}
    />
  ))
)}
                    {/* })} */}

                </ul>
            </div>
        </section>
        </>
    )
}