import React from 'react';
import { useParams } from 'react-router-dom';
import gymleaderPokemons from './gymLeadersPokemons';
import PokemonBattle from '../pokemonbattle/pokemonBatte';

function GymLeaderBattle() {
  const { number } = useParams();
  const leader = `gymleader${number}`;
  const enemies = gymleaderPokemons[leader];
  const zoneID = 'gym';
  return <PokemonBattle enemies={enemies} zoneID={zoneID} arenaBattle={true} />;
}

export default GymLeaderBattle;
