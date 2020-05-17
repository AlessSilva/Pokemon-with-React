import React from 'react';
import InforGeneral from './inforGeneral';

function PokemonInforGeneral({ pokemon, idPokemon }) {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <InforGeneral pokemon={pokemon} idPokemon={idPokemon}/>
        </div>
      </div>
    </>
  );
}

export default PokemonInforGeneral;
