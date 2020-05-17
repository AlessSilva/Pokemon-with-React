import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import apiPokemon from '../../services/apiPokemon';

import helper from '../../helpers/URLUtil';

import '../../css/pokedexinfor.css';
import CardInfor from './cardInfor';

function PokedexInfor() {
  const { id } = useParams();
  const URLPokemon = `${helper.URLPokemon}${id}`;
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    apiPokemon
      .get(URLPokemon)
      .then((result) => {
        setPokemon({
          name: result.data.name,
          base: result.data.base_experience,
          height: result.data.height,
          weight: result.data.weight,
        });

        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [URLPokemon, id]);

  return <CardInfor id={id} pokemon={pokemon} />;
}

export default PokedexInfor;
