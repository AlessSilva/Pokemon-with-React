import React from 'react';

import helper from '../../helpers/URLUtil';

function PokemonShow({ index, idPokemon, enemy, handlerOnClick }) {
  const imgPokemon = `${helper.URLPokemonFront}${idPokemon}.png`;

  function aux() {
    if (enemy) {
      return <img src={imgPokemon} alt={idPokemon} />;
    }
    return (
      <button
        onClick={() => handlerOnClick(index)}
        className="btn btn-outline-light"
        style={{ padding: 0, margin: 0, border: 'none' }}
      >
        <img src={imgPokemon} alt={idPokemon} />
      </button>
    );
  }

  return aux();
}

export default PokemonShow;
