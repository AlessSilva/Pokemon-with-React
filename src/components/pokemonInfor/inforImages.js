import React from 'react';

import helper from '../../helpers/URLUtil';

function PokedexInforImages({ idPokemon }) {
  const imgFront = `${helper.URLPokemonFront}${idPokemon}.png`;
  const imgBack = `${helper.URLPokemonBack}${idPokemon}.png`;

  return (
    <div className="row">
      <div className="col-6">
        <img src={imgFront} alt={idPokemon} />
      </div>
      <div className="col-6">
        <img src={imgBack} alt={idPokemon} />
      </div>
    </div>
  );
}

export default PokedexInforImages;
