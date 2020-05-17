import React, { useState, useEffect } from 'react';

import apiPokemon from '../../services/apiPokemon';

import helper from '../../helpers/URLUtil';
import MoveList from './moveList';

function PokedexInforMoves({ idPokemon }) {
  const URLPokemon = `${helper.URLPokemon}${idPokemon}`;

  const [moves, setMoves] = useState([]);

  useEffect(() => {
    apiPokemon
      .get(URLPokemon)
      .then((result) => {
        setMoves(
          result.data.moves.map((element, index) => {
            return element.move.name.toUpperCase();
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [URLPokemon]);

  return (
   <MoveList moves={moves}/>
  );
}

export default PokedexInforMoves;
