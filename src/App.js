import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//Components
import Navbar from './components/navbar';
import Pokedex from './components/pokedex/pokedex';
import PokedexInfo from './components/pokemonInfor/pokemonInfor';
import Home from './components/home/home';

function App() {
  function getStarterPokemons() {
    const options = [
      {
        //Bulbasaur
        id: 1,
        name: 'bulbasaur',
        life: 70,
        types: ['poison','grass'],
        moves: ['razor-wind', 'swords-dance', 'grassy-terrain', 'magical-leaf'],
      },
      {
        //Charmander
        id: 4,
        name: 'charmander',
        life: 70,
        types: ['fire'],
        moves: ['mega-kick', 'fire-punch', 'frustation', 'ancient-power'],
      },
      {
        //Squirtle
        id: 7,
        name: 'squirtle',
        life: 70,
        types: ['water'],
        moves: ['water-pledge ', 'ice-punch', 'double-edge', 'bubble-beam'],
      },
    ];

    const pikachu = {
      id: 25,
      name: 'pikachu',
      life: 112,
      types: ['electric'],
      moves: ['thunder-punch', 'submission', 'thunder', 'agility'],
    };
    return [pikachu, options[Math.floor(Math.random() * 3)]];
  }

  const pokedexURL = 'https://pokeapi.co/api/v2/pokemon';
  sessionStorage.setItem('pokedexURL', pokedexURL);

  const myPokemons = getStarterPokemons();
  sessionStorage.setItem('myPokemons', JSON.stringify(myPokemons));

  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Switch>
          <Route exact path="/pokedex" component={Pokedex} />
          <Route exact path="/pokedex/:id" component={PokedexInfo} />
          <Route exact path="/" component={Home} />
          <Route exact path="/mypokemons" />
          <Route exact path="/pokemonbattle" />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
