import { useState, useEffect } from 'react'
import axios from 'axios'
import {Routes, Route, Link } from "react-router-dom";
import './App.css'
import Gallery from "./Gallery";
import Details from "./Details";

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  abilities: { ability: { name: string } }[];
  species: { name: string };
  sprites: { front_default: string };
  types: { type: { name: string } }[];
}

function ListView({ pokeResults }: { pokeResults: Pokemon[] }) {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'base_experience'>('name'); //defualt is name
  const [descending, isDescending] = useState(true);

  const searchResults =  pokeResults.filter((p) => p.name.startsWith(query.trim().toLowerCase()))
  const sortedResults = 
    sortBy === 'name' ? 
      descending? 
      searchResults.sort((a,b)=> b.name.localeCompare(a.name)) : searchResults.sort((a,b)=>a.name.localeCompare(b.name)) 
    : descending ? 
    searchResults.sort((a,b)=> b.base_experience - a.base_experience) 
    : searchResults.sort((a,b)=>  a.base_experience-  b.base_experience)

  return (
    <>
      <section id="center">
      <h1>Pokemon Search</h1>
      <Link className="link" to="/gallery">Gallery</Link>
      <div className="filter">
          <h3>Sort by:</h3>
          <button className={sortBy === 'name' ?"button selected" : "button"}  type="button" onClick={() => setSortBy('name')}>Name</button>
          <button className={sortBy === 'base_experience' ? "button selected" : "button"} type="button" onClick={() => setSortBy('base_experience')}>XP</button>
          <button className={descending === false ? "button selected" : "button"} type="button" onClick={() => isDescending(false)}>Ascending</button>
          <button className={descending === true ? "button selected" : "button"} type="button" onClick={() => isDescending(true)}>Descending</button>
      </div>
      <div className="search-box">
        <label>
          Search:
          <input type="text" placeholder="e.g., Pikachu..." value={query} onChange={e => setQuery(e.target.value)}/>
        </label>
      </div>
      <div className = "search-results">
        {sortedResults.map((p) => (
          <Link key={p.id} to={`/pokemon/${p.id}`} className="gallery-item">
            <h4>{p.name}</h4>
            <h4>XP: {p.base_experience}</h4>
            <img src={p.sprites.front_default} alt={p.name} />
          </Link>
        ))}
      </div>
      </section>
    </>
  )
}

function App() {
  const [pokeResults, setPokeResults] = useState<Pokemon[]>([]);//default is empty
  useEffect(() => {
    const ids = Array.from({ length: 151 }, (_, i) => i + 1);//array of the ids
    Promise.all( //wait to get all pokemon at once, goes through each id
      ids.map((id) => axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}/`))
    )
      .then((responses) => setPokeResults(responses.map((r) => r.data)))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<ListView pokeResults={pokeResults} />} />
      <Route path="/gallery" element={<Gallery pokeResults={pokeResults} />} />
      <Route path="/pokemon/:id" element={<Details pokeResults={pokeResults} />} />
    </Routes>
  )
}

export default App