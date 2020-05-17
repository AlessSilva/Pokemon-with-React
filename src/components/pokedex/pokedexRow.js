import React from 'react';
import helper from '../../helpers/URLUtil';
import { Link } from 'react-router-dom';

import '../../css/pokedex.css';

function PokedexRow({ pokemon }) {
  function getPokemonID(url) {
    const strings = url.split('/');
    return strings[strings.length - 2];
  }

  const idPokemon = getPokemonID(pokemon.url);
  const namePokemon = pokemon.name;
  const imgPokemon = `${helper.URLPokemonFront}${idPokemon}.png`;

  return (
    <tr>
      <td style={{ verticalAlign: 'middle' }}>{idPokemon}</td>
      <td style={{ verticalAlign: 'middle' }}>{namePokemon}</td>
      <td style={{ verticalAlign: 'middle' }}>
        <img src={imgPokemon} alt={idPokemon} />
      </td>
      <td style={{ verticalAlign: 'middle' }}>
        <Link to={`/pokedex/${idPokemon}`} className="btn btn-primary">
          More Informations
        </Link>
      </td>
    </tr>
  );
}

export default PokedexRow;
