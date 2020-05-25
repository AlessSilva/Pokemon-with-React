import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import '../../css/pokedexinfor.css';

import PokedexInforImages from '../pokemonInfor/inforImages';
import PokemonInforGeneral from '../pokemonInfor/inforGeneral';
import MoveList from '../pokemonInfor/moveList';

function MyPokemonCardInfor() {
  const [pokemon, setPokemon] = useState([]);
  const { id } = useParams();
  const myPokemons = JSON.parse(sessionStorage.getItem('myPokemons'));

  useEffect(() => {
    if (pokemon.length === 0) {
      for (let index = 0; index < myPokemons.length; index++) {
        const p = myPokemons[index];
        if (p.id == id) {
          setPokemon(p);
          return;
        }
      }
    }
  }, [myPokemons, id, pokemon]);

  return (
    <div className="container" align="center">
      <div className="card">
        <div className="card-header">
          <h3>{`${pokemon.id} - ${pokemon.name}`}</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <PokedexInforImages idPokemon={pokemon.id} />
            </div>
            <div className="col-6">
              <PokemonInforGeneral pokemon={pokemon} idPokemon={pokemon.id} />
            </div>
          </div>
          <div className="row">
            <div className="col-12" style={{ border: '1px' }}>
              <MoveList moves={pokemon.moves}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPokemonCardInfor;
