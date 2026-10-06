
import { Link, useParams } from "react-router-dom";
import type { Pokemon } from "./App";

function Details({ pokeResults }: { pokeResults: Pokemon[] }) {
  const { id } = useParams();
  const sortedResults = pokeResults.slice().sort((a,b)=> a.name.localeCompare(b.name))
  const totalNum = sortedResults.length;
  const currentIndex = sortedResults.findIndex((p) => p.id === Number(id));
  const current = sortedResults[currentIndex];
  const prev = sortedResults[currentIndex === 0 ? totalNum - 1 : currentIndex - 1];
  const next = sortedResults[currentIndex === totalNum - 1 ? 0 : currentIndex + 1];

  return (
    <section id="center">
    <h1>Details</h1>
    <div>
      <Link className="link" to="/">Search</Link>
      <Link className="link" to="/gallery">Gallery</Link>
    </div>

    <div className="carousel">
    <Link className="carousel-button carousel-button-left" to={`/pokemon/${prev.id}`}>&#8592;</Link>
      <div className="slide">
        <img src={current.sprites.front_default} alt={current.name} />
        <h2>{current.name}</h2>
        <p>XP: {current.base_experience}</p>
        <p>Types: {current.types.map((t) => t.type.name).join(", ")}</p>
        <p>Abilities: {current.abilities.map((a) => a.ability.name).join(", ")}</p>
      </div>
      <Link className="carousel-button carousel-button-right" to={`/pokemon/${next.id}`}>&#8594;</Link>
    </div>
  </section>
)
}

export default Details