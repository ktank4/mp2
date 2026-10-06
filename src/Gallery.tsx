import { useState } from "react";
import { Link } from "react-router-dom";
import type { Pokemon } from "./App";

function Gallery({ pokeResults }: { pokeResults: Pokemon[] }) {
  const [selectedType, setType] = useState<string | null>(null);
  const filterBy = (type: string) => { setType(selectedType === type ? null : type);};
  const typesSet = new Set<string>();
  for (const p of pokeResults) {
    for (const t of p.types) {
      typesSet.add(t.type.name);
    }
  }
  const allTypes = Array.from(typesSet).sort();
  
  const filteredResults: Pokemon[] = [];
  for (const p of pokeResults) {
    for (const t of p.types) {
      if (t.type.name === selectedType) {
        filteredResults.push(p);
        break;
      }
    }
  }
const shown = selectedType === null ? pokeResults : filteredResults;
  return (
    <section id="center">
      <h1>Gallery</h1>
      <Link className="link" to="/">Search</Link>
      <div className="type-filters">
        {allTypes.map((type) => (
          <button
            key={type}
            type="button"
            className={selectedType === type ? "button selected" : "button"}
            onClick={() => filterBy(type)}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="gallery">
        {shown.map((p) =>(
          <Link key={p.id} to={`/pokemon/${p.id}`} className="gallery-item">
            <img src={p.sprites.front_default} alt={p.name} />
            <h4>{p.name}</h4>
            <h4>XP: {p.base_experience}</h4>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Gallery