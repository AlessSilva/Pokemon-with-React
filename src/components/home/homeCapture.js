import React from 'react';
import { useParams } from 'react-router-dom';

import PokemonBattle from '../pokemonbattle/pokemonBatte';

function HomeCapture() {
  const enemies = JSON.parse(sessionStorage.getItem('enemies'));
  const {zoneID} = useParams();
  return <PokemonBattle enemies={enemies} zoneID={zoneID} arenaBattle={false} />;
}

export default HomeCapture;
