const PokemonStrengths = {
  grass: ['ground', 'rock', 'water'],
  bug: ['grass', 'dark', 'psychic'],
  dark: ['ghost', 'psychic'],
  ghost: ['ghost', 'psychic'],
  electric: ['flying', 'water'],
  water: ['fire', 'ground', 'rock'],
  psychic: ['fighting', 'poison'],
  fairy: ['fighting', 'dark', 'dragon'],
  steel: ['fairy', 'ice', 'rock'],
  poison: ['fairy', 'grass'],
  ground: ['electric', 'fire', 'poison', 'rock', 'steel'],
  ice: ['dragon', 'flying', 'grass', 'ground'],
  dragon: ['dragon'],
  fighting: ['dark', 'ice', 'normal', 'rock', 'steel'],
  fire: ['bug', 'grass', 'ice', 'steel'],
  rock: ['bug', 'fire', 'flying', 'ice'],
  flying: ['bug, fighting', 'grass'],
  normal: [],
};

export default PokemonStrengths;
