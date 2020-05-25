import React from 'react';
import { Link } from 'react-router-dom';

import helper from '../../helpers/URLUtil';

function MyPokemonRow({ pokemon }) {
  const imgPokemon = `${helper.URLPokemonFront}${pokemon.id}.png`;
  const myPokemons = JSON.parse(sessionStorage.getItem('myPokemons'));

  function handlerToAbandon() {
    if(myPokemons.length === 1){
      alert("You need at least one Pokémon");
      return;
    }
    const index = myPokemons.findIndex((p) => p.id == pokemon.id);
    myPokemons.splice(index,1);
    sessionStorage.setItem('myPokemons',JSON.stringify(myPokemons));
    console.log(index);
  }

  return (
    <tr>
      <td style={{ verticalAlign: 'middle' }}>{pokemon.id}</td>
      <td style={{ verticalAlign: 'middle' }}>{pokemon.name}</td>
      <td style={{ verticalAlign: 'middle' }}>
        <img src={imgPokemon} alt={pokemon.id} />
      </td>
      <td style={{ verticalAlign: 'middle' }}>
        <Link to={`/mypokemon/${pokemon.id}`} className="btn btn-primary">
          More Informations
        </Link>
      </td>
      <td style={{ verticalAlign: 'middle' }}>
        <Link className="btn btn-danger" 
        onClick={handlerToAbandon}
        to={'/mypokemons'}>
          To Abandon
        </Link>
      </td>
    </tr>
  );
}

export default MyPokemonRow;
