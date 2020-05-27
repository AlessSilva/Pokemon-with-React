import React from 'react';

import helper from '../../helpers/URLUtil';

function PokemonShow({ index, idPokemon, enemy, pokemon, lifePokemon, handlerOnClick }) {
  const imgPokemon = `${helper.URLPokemonFront}${idPokemon}.png`;

  function aux() {
    let opacity = 1;
    if(lifePokemon===0){
      opacity = 0;
    }else if(lifePokemon/(pokemon.base+pokemon.extra)){
      opacity = lifePokemon/(pokemon.base+pokemon.extra);
    }
    if (enemy) {
      return <img src={imgPokemon} alt={idPokemon} style={{opacity:opacity}}/>;
    }
    return (
      <button
        onClick={() => handlerOnClick(index)}
        className="btn btn-outline-light"
        style={{ padding: 0, margin: 0, border: 'none' }}
        disabled={lifePokemon<=0}
      >
        <img src={imgPokemon} alt={idPokemon} style={{opacity:opacity}}/>
      </button>
    );
  }

  return aux();
}

export default PokemonShow;
