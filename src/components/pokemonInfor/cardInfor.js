import React from 'react';

import PokedexInforMoves from './pokedexInforMoves';
import PokedexInforImages from './inforImages';
import PokemonInforGeneral from './pokemonInforGeneral';

import '../../css/pokedexinfor.css';

function CardInfor({ id, pokemon }) {
  return (
    <div className="container" align="center">
      <div className="card">
        <div className="card-header"><h3>{`${id} - ${pokemon.name}`}</h3></div>
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <PokedexInforImages idPokemon={id} />
            </div>
            <div className="col-6">
              <PokemonInforGeneral pokemon={pokemon} idPokemon={id} />
            </div>
          </div>
          <div className="row">
            <div className="col-12" style={{border: '1px'}}>
              <PokedexInforMoves idPokemon={id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardInfor;
