import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//Components
import Navbar from './components/navbar';
import Pokedex from './components/pokedex/pokedex';
import PokedexInfo from './components/pokemonInfor/pokemonInfor';
import Home from './components/home/home';
import MyPokemons from './components/mypokemons/mypokemons';
import MyPokemonCardInfor from './components/mypokemons/myPokemonsInfor';
import HomeCapture from './components/home/homeCapture';
import GymLeadersTable from './components/gymLeader/gymLeadersTable';
import GymLeaderBattle from './components/gymLeader/gymLeaderBattle';

function App() {
  function getStarterPokemons() {
    const options = [
      {
        //Bulbasaur
        id: 1,
        name: 'bulbasaur',
        nick: 'verdinho',
        base: 77,
        extra:0,
        weight: 89,
        height: 9,
        types: ['poison', 'grass'],
        moves: ['razor-wind', 'swords-dance', 'grassy-terrain', 'magical-leaf'],
      },
      {
        //Charmander
        id: 4,
        name: 'charmander',
        base: 77,
        extra:0,
        weight: 90,
        height: 10,
        types: ['fire'],
        moves: ['mega-kick', 'fire-punch', 'frustation', 'ancient-power'],
      },
      {
        //Squirtle
        id: 7,
        name: 'squirtle',
        base: 70,
        extra:0,
        weight: 92,
        height: 5,
        types: ['water'],
        moves: ['water-pledge ', 'ice-punch', 'double-edge', 'bubble-beam'],
      },
    ];

    const pikachu = {
      id: 25,
      name: 'pikachu',
      base: 112,
      extra:0,
      weight: 60,
      height: 4,
      types: ['electric'],
      moves: ['thunder-punch', 'submission', 'thunder', 'agility'],
    };
    return [pikachu, options[Math.floor(Math.random() * 3)]];
  }

  const pokedexURL = 'https://pokeapi.co/api/v2/pokemon';
  sessionStorage.setItem('pokedexURL', pokedexURL);

  const myPokemons = getStarterPokemons();
  console.log(myPokemons);
  sessionStorage.setItem('myPokemons', JSON.stringify(myPokemons));

  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Switch>
          <Route exact path="/pokedex" component={Pokedex} />
          <Route exact path="/pokedex/:id" component={PokedexInfo} />
          <Route exact path="/" component={Home} />
          <Route exact path="/mypokemons" component={MyPokemons} />
          <Route exact path="/mypokemon/:id" component={MyPokemonCardInfor} />
          <Route exact path="/home/capture/:id/:zoneID" component={HomeCapture} />
          <Route exact path="/gymleader" component={GymLeadersTable} />
          <Route exact path="/gymleader/:number" component={GymLeaderBattle}/>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
